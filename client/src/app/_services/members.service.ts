import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { of, tap } from 'rxjs';
import { Photo } from '../_models/photo';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  private  toastr = inject(ToastrService);
  baseUrl = environment.apiUrl;
  members = signal<Member[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);


  getMembers(userParams: UserParams) {
    console.log('Get Params was called');
    let params = this.setPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy',userParams.orderBy);

    console.log(params);
console.log('Get Params was called in getMembers');
    return this.http.get<Member[]>(this.baseUrl + 'users', {observe:'response', params}).subscribe({
      next: response => {
        this.paginatedResult.set({
          items: response.body as Member[],
          pagination: JSON.parse(response.headers.get('Pagination')!)
        })
      }
    });
  }
  private setPaginationHeaders(pageNumber: number, pageSize: number){
    let params = new HttpParams();
    
    if(pageNumber && pageSize){
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    return params;
  }
  getMember(username: string) {
    // const member = this.members().find(x => x.username === username);
    // if(member !== undefined) return of(member);

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
  updateMember(member:Member){
    return this.http.put(this.baseUrl + 'users', member).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => m.username ===member.username ? member : m));
      // })
    );
  }
 setMainPhoto(photo: Photo){
  return this.http.put(this.baseUrl + 'users/set-main-photo/' + photo.id, {}).pipe( 
    //   tap(() =>{
    //     this.members.update(members => members.map(m=> {
    //       if(m.photos.includes(photo)){
    //         m.photoUrl = photo.url
    //   }
    //   return m;
    //   }))
    // })
  )
 }
 deletePhoto(photo: Photo){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photo.id).pipe( 
    //   tap(() =>{
    //     this.members.update(members => members.map(m=> {
    //       if(m.photos.includes(photo)){
    //         m.photos = m.photos.filter(x => x.id !== photo.id)
    //   }
    //   return m;
    //   }))
    // })
  )
 }
}