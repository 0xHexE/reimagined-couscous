import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import * as Parse from 'parse';
import {from, interval} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Printable} from '../../class/printable';

@Component({
  selector: 'f4erp-duplicate-finder',
  templateUrl: './duplicate-finder.component.html',
  styleUrls: ['./duplicate-finder.component.scss']
})
export class DuplicateFinderComponent implements OnInit {
  fields: Promise<any>;
  keys = {};

  constructor() { }

  ngOnInit() {
    this.fields = fetch(`${ environment.parseServer }/schemas/printable`, {
      method: 'POST',
      body: JSON.stringify({
        '_ApplicationId': environment.appId,
        '_MasterKey':	'k3P0dOcNO9nt5WzODIjhcPR6G5HzXO5B8cciu3LL',
        '_method': 'GET',
      }),
    }).then(docs => docs.json()).then(docs => docs.fields)
      .then(docs => Object.keys(docs));
  }

  get keysToArray() {
    return Object.keys(this.keys)
      .filter(key => !!this.keys[key]);
  }

  async runJob() {
    (Parse as any).masterKey = 'k3P0dOcNO9nt5WzODIjhcPR6G5HzXO5B8cciu3LL';
    console.log((Parse as any));
    const jobStatus = await (Parse.Cloud as any).startJob('findDuplicate', {
      keys: this.keysToArray,
    });

    const interv = interval(15000);

    const sub = interv.pipe().subscribe(d => {
      (Parse.Cloud as any).getJobStatus(jobStatus).then(docs => {
        if (docs.get('status') !== 'running') {
          sub.unsubscribe();
          alert('Done');
        }
      });
    });
  }

}
