import { Component, HostListener, OnInit, VERSION } from '@angular/core';
import { environment } from '../environments/environment';
// import { Events } from '@ionic/angular';
import { UrlConsumerService } from '../app/oauth/url-consumer.service';
import { UserInfo } from '../app/oauth/user-info.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	demoProp: string;
	hamMenu: boolean;
	display: boolean = false;
	whatHasChanged = true;
	AppInfoDisplay: boolean = false;
	userName = '';
	cdsId = '';
	userInfo: UserInfo = new UserInfo();

	version = VERSION.full;
	envProd = environment.production;
	@HostListener('window:resize', ['$event']) onResize(event?) {
		if (event.target.innerWidth > 767) {
			this.hamMenu = false;
		}
	}

	// constructor(private requestAccessService: RequestAccessService, private appService: AppService,
	// 	private urlService: UrlConsumerService, public events: Events) {
	constructor(private urlService: UrlConsumerService) {
		this.urlService.change.subscribe(() => {
			this.userName = this.urlService.userInfo.fullName;
			this.cdsId = this.urlService.userInfo.cdsId;
			this.userInfo = this.urlService.userInfo;
			console.log('this.userName',this.userName);
			console.log('this.cdsId',this.cdsId);
			console.log('this.userInfo',this.userInfo);
		});
		// events.subscribe('user:login', (userInfo: any) => {
		// 	this.renderMenu(userInfo);
		// });
	}

	ngOnInit(): void {
		this.userInfo = this.urlService.userInfo;
		if (this.userInfo != null) {
			this.cdsId = this.userInfo.cdsId;
			this.userName = this.userInfo.fullName;
		}
		this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
		if (this.userInfo != null) {
			this.renderMenu(this.userInfo);
		}

	}

	renderMenu(userInfo: any) {
		console.log(JSON.stringify(userInfo));
		this.userInfo = userInfo;
		// this.customerInfo=JSON.parse(sessionStorage.getItem('customerInfo'));
		let data = userInfo;
		let roles = data.roles;
		// Object.keys(roles).forEach(role => {
		// 	this.userRoles.set(role, roles[role]);
		// });
		// let customerInfo = new CustomerInfoModel();
		// if (this.userRoles.get('GVTDM') != null) {
		// 	customerInfo.projects = new Set<string>();
		// 	this.gvtdmRoles = this.userRoles.get('GVTDM');
		// 	if (this.gvtdmRoles.includes('admin')) {
		// 		customerInfo.superAdmin = true;
		// 	}
		// 	if (this.gvtdmRoles.includes('ADMIN-CCL')) {
		// 		customerInfo.ccladmin = true;
		// 	}
		// 	if (this.gvtdmRoles.includes('Admin-BITS')) {
		// 		customerInfo.bitsAdmin = true;
		// 	}
		// 	if (this.gvtdmRoles.includes('Admin-EMI')) {
		// 		customerInfo.emissionAdmin = true;
		// 	}
		// 	if (this.gvtdmRoles.includes('Admin-Logger')) {
		// 		customerInfo.loggerAdmin = true;
		// 	}
		// 	if (customerInfo.superAdmin) {
		// 		customerInfo.projects.add('LOGGER');
		// 		customerInfo.projects.add('CCL');
		// 		customerInfo.projects.add('BITS');
		// 		customerInfo.projects.add('EMI');
		// 		customerInfo.isLoggerUser = true;
		// 		customerInfo.isCclUser = true;
		// 		customerInfo.isBitsUser = true;
		// 		customerInfo.isEmiUser = true;
		// 	} else {
		// 		for (let role of this.gvtdmRoles) {
		// 			if (role.includes('Logger')) {
		// 				customerInfo.projects.add('LOGGER');
		// 				customerInfo.isLoggerUser = true;
		// 			} else if (role.includes('CCL')) {
		// 				customerInfo.projects.add('CCL');
		// 				customerInfo.isCclUser = true;
		// 			} else if (role.includes('BITS')) {
		// 				customerInfo.projects.add('BITS');
		// 				customerInfo.isBitsUser = true;
		// 			} else if (role.includes('EMI')) {
		// 				customerInfo.projects.add('EMI');
		// 				customerInfo.isEmiUser = true;
		// 			}
		// 		}
		// 	}
		// 	this.customerInfo = customerInfo;
		// 	data.gvtdmProjects = Array.from(customerInfo.projects);
		// 	data.superAdmin = customerInfo.superAdmin;
		// 	this.userInfo = data;
		// 	sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo));
		// 	sessionStorage.setItem('customerInfo', JSON.stringify(this.customerInfo));
		// }
	}

	showDialog() {
		this.display = true;
	}

	showAppInfo() {
		this.AppInfoDisplay = true;
	}
}
