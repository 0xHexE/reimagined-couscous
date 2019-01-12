import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Printable} from '../../class/printable';
import { chunk } from 'lodash';
import * as Parse from 'parse';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {CacheTranslate} from '../../class/cache-translate';

@Component({
  selector: 'f4erp-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss']
})
export class ImportDialogComponent implements OnInit {
  formGroup: FormGroup;
  lastFileContent: string;
  preview: any;
  translateKeys = {};
  headers = [];
  percentage = 0;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      'data': this.formBuilder.array([]),
    });
  }

  ngOnInit() {
  }

  async parseFile($event: any) {
    await new Promise(resolve => {
      const file = $event.target.files[0];
      const fileReader = new FileReader();

      fileReader.addEventListener('load', (content: any) => {
        const fileContent = content.target.result;
        this.lastFileContent = fileContent;
        const parseResult = Papa.parse(fileContent, { header: true, preview: 10, encoding: 'utf-8' });
        this.headers = parseResult.meta.fields;
        this.preview = parseResult.data;
      });

      fileReader.readAsText(file);
    });
  }

  async importFile() {
    const data = Papa.parse(this.lastFileContent, { header: true, encoding: 'utf-8' }).data;
    const chunkData = chunk(data, 50);
    let i = 0;
    this.percentage = 0.0001;
    for (const d of chunkData) {
      this.percentage = (i * 100) / data.length;
      i += 50;
      await Promise.all(d.map(async res => {
        const printable = new Printable();
        const id = res['id'] || res['ID'] || res['iD'] || res['iD'];
        await Promise.all(Object.keys(res).map(async e => {
          if (!!this.translateKeys[e]) {
            let tokens = [];
            for (const inputToken of res[e].replace(/[^a-zA-Z]/g, ' ').split(' ').map(toke => toke.trim()).filter(res1 => res1.length)) {
              const inputTokenTrimmed = `${ inputToken }`.toLowerCase();
              const cache = await new Parse.Query(CacheTranslate)
                .equalTo('key', inputTokenTrimmed)
                .first()
                .catch(() => undefined);

              if (cache) {
                tokens = tokens.concat(cache.get('value'));
                continue;
              }

              const newVar = await fetch(
                `https://inputtools.google.com/request?text=${
                  inputTokenTrimmed
                }&itc=mr-t-i0-und&num=13&cp=0&cs=1&ie=utf-8&oe=utf-8&app=translate`,
              ).then(docs => docs.json()).then(docs => docs[1][0][1]).catch(() => []);

              const cacheTranslate = new CacheTranslate();
              cacheTranslate.set('key', inputTokenTrimmed);
              cacheTranslate.set('value', newVar);
              await cacheTranslate.save();
              tokens = tokens.concat(newVar);
            }
            printable
              .set(`DB_MR_${ e }`, tokens);
          }
          printable.set(e, res[e]);
        }));
        printable.set(`_TRANSLATED_KEYS`, this.translateKeys);
        return await new Parse.Query(Printable)
          .equalTo('ID', id)
          .first()
          .then((docs) => {
            if (docs) {
              printable.id = docs.id;
            }
          })
          .then(() => printable.save());
      }));
    }
    this.percentage = 100;
    alert('Import done!');
  }
}
