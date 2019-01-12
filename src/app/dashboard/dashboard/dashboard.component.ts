import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ImportDialogComponent} from '../import-dialog/import-dialog.component';
import {environment} from '../../../environments/environment';
import {Printable} from '../../class/printable';
import * as Parse from 'parse';

@Component({
  selector: 'f4erp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  schema: Promise<any>;
  data: any;

  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.data = new Parse.Query(Printable)
      .ascending('FNm')
      .addAscending('LNm')
      .addAscending('MNm')
      .limit(999999999)
      .find();
    this.schema = fetch(`${ environment.parseServer }/schemas/printable`, {
      method: 'POST',
      body: JSON.stringify({
        '_ApplicationId': environment.appId,
        '_MasterKey':	'k3P0dOcNO9nt5WzODIjhcPR6G5HzXO5B8cciu3LL',
        '_method': 'GET',
      }),
    }).then(docs => docs.json()).then(docs => docs.fields)
      .then(docs => Object.keys(docs));
  }

  openImportData() {
    this.matDialog.open(ImportDialogComponent);
  }
}
