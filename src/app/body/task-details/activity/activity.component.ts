/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/Interface/ActivityInterface';
import { User, UserAppSetting, defaultUser} from "../../../Interface/UserInterface";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input('activity') activity: Activity

  public userObservable: Observable<UserAppSetting>;
  // public userDocument: AngularFirestoreDocument<UserAppSetting>;

  user: UserAppSetting;

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail() {
    if(this.activity.Uid == "defaultUser"){
      this.user = defaultUser;
    }
    else {
      this.user = this.userService.users.filter((obj) => {
        return obj.uid == this.activity.Uid
      })[0];
      // var documentName = "Users/"+this.activity.Uid;
      // this.userDocument = this.db.doc<UserAppSetting>(documentName);
      // this.userObservable = this.userDocument.snapshotChanges().pipe(
      //   map(actions => {
      //     const data = actions.payload.data() as UserAppSetting;
      //     this.user = data;
      //     return { ...data }
      //   }));
    }

  }
}

