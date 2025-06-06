import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { ToastrService } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TitleCasePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, GalleryModule, TitleCasePipe, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;  //used to get child information from the form.
  @HostListener('window:beforeunload', ['$event']) notify($event:any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  member?: Member;
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toastr = inject(ToastrService);
  images: GalleryItem[] = [];
  ngOnInit(): void {
    this.loadMember();
  }

  private loadMember() {
    const username = this.accountService.currentUser()?.username;
    if (username) {
      this.memberService.getMember(username).subscribe({
        next: member => {
          this.member = member;
          this.member.photos.map(p => this.images.push(new ImageItem({ src: p.url, thumb: p.url })));
        },
        error: () => this.toastr.error('Failed to load member'),
      });
    }
  }
  updateMember(){
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _=>{
        console.log("Update ");
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);  //now I can access the form data 
      }
    })

  }

}
