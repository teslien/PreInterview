import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestDataService } from 'src/app/service/test-data.service';
import * as XLSX from 'xlsx'



@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent implements OnInit {




	testDataFromHome:any;
	dataSubs:Subscription;
	ExcelData:any[];
	loading: boolean;
	constructor(private activatedRoute: ActivatedRoute,private testService: TestDataService, private route:Router){}

	ngOnInit(): void {
		this.dataSubs= this.activatedRoute.queryParams.subscribe(data=>{
			const obj = data['id'];
			this.testDataFromHome= JSON.parse(obj)
		})
	}

	ReadExcel(event:any){
		let file = event.target.files[0];
		let fileReader = new FileReader();
		fileReader.readAsBinaryString(file);

		fileReader.onload = (e)=>{
			var workbook = XLSX.read(fileReader.result,{type:'binary'});
			var sheetNames = workbook.SheetNames;
			this.ExcelData= XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
		
				}

	}


	OnNextUpload(){
		this.loading=true;
		const length = this.ExcelData.length;
		const adminId = sessionStorage.getItem("UserId")
		if(length>0){
			for (let i = 0; i <=length; i++) {
				const applicantData = {
					email:this.ExcelData[i].Email,
					mobile_number:this.ExcelData[i].Mobile_number,
					location:this.ExcelData[i].Location,
					name:this.ExcelData[i].Name,
					position:this.ExcelData[i].Applied,
					test_allocated_id:this.testDataFromHome.id,
					test_category:this.testDataFromHome.category.name,
					test_name:this.testDataFromHome.testName,
					test_status:"Not Started",
					totalTimeInMins:this.testDataFromHome.totalTimeInMins,
					totalquestions:this.testDataFromHome.totalQuestions,
					firstPic:"empty",
					ip:"empty",
					trackedlocation:"empty",
					score:"0",
					imageCaptured:"empty",
					answerGiven:"empty"
				}
				this.testService.postAddApplicantData(applicantData,adminId).subscribe(res=>{
			
					this.loading=false;
					this.route.navigate(['/admin/tests']);
				})
			  }
		
		}

		
	}

}