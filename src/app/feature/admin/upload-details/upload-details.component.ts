import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'



@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent implements OnInit {


	ExcelData:any[];

	ngOnInit(): void {
		
	}

	ReadExcel(event:any){
		let file = event.target.files[0];
		let fileReader = new FileReader();
		fileReader.readAsBinaryString(file);

		fileReader.onload = (e)=>{
			var workbook = XLSX.read(fileReader.result,{type:'binary'});
			var sheetNames = workbook.SheetNames;
			this.ExcelData= XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
			console.log(this.ExcelData);
				}

	}


}