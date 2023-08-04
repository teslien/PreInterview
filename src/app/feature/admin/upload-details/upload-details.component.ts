import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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



	applicantForm: FormGroup;
	testDataFromHome: any;
	dataSubs: Subscription;
	ExcelData: any[]=[];
	loading: boolean;
	displayBasic: boolean;
	constructor(private activatedRoute: ActivatedRoute, private testService: TestDataService, private route: Router) { }

	ngOnInit(): void {
		this.dataSubs = this.activatedRoute.queryParams.subscribe(data => {
			const obj = data['id'];
			this.testDataFromHome = JSON.parse(obj)
		})

		this.applicantForm = new FormGroup({
			'name': new FormControl(null,Validators.required),
			'email': new FormControl(null,[Validators.required,Validators.email]),
			'mobile': new FormControl(null,[Validators.required]),
			'location': new FormControl(null,Validators.required),
			'position': new FormControl(null,Validators.required)
		})
	}

	ReadExcel(event: any) {
		let file = event.target.files[0];
		let fileReader = new FileReader();
		fileReader.readAsBinaryString(file);

		fileReader.onload = (e) => {
			var workbook = XLSX.read(fileReader.result, { type: 'binary' });
			var sheetNames = workbook.SheetNames;
			this.ExcelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
			console.log(this.ExcelData);

		}

	}


	OnNextUpload() {
		this.loading = true;
		const length = this.ExcelData.length;
		const adminId = sessionStorage.getItem("UserId")
		if (length > 0) {
			for (let i = 0; i <= length; i++) {
				const applicantData = {
					email: this.ExcelData[i].Email,
					mobile_number: this.ExcelData[i].Mobile_number,
					location: this.ExcelData[i].Location,
					name: this.ExcelData[i].Name,
					position: this.ExcelData[i].Applied,
					test_allocated_id: this.testDataFromHome.id,
					test_category: this.testDataFromHome.category.name,
					test_name: this.testDataFromHome.testName,
					test_status: "Not Started",
					totalTimeInMins: this.testDataFromHome.totalTimeInMins,
					totalquestions: this.testDataFromHome.totalQuestions,
					firstPic: "empty",
					ip: "empty",
					trackedlocation: "empty",
					score: "0",
					imageCaptured: "empty",
					answerGiven: "empty"
				}
				this.testService.postAddApplicantData(applicantData, adminId).subscribe(res => {

					this.loading = false;
					this.route.navigate(['/admin/tests']);
				})
			}

		}


	}

	showModalDialog() {
		this.displayBasic = true;
	}

	OnAdd() {
		if(this.applicantForm.valid){
			if(this.ExcelData!=undefined){
				let data = {
					Applied: this.applicantForm.get('position').value,
					Email: this.applicantForm.get('email').value,
					Location :this.applicantForm.get('location').value,
					Mobile_number : this.applicantForm.get('mobile').value,
					Name : this.applicantForm.get('name').value,
					SrNo : this.ExcelData.length+1
				}
				this.ExcelData.push(data);
			}
			this.applicantForm.reset();
		}

	}

}