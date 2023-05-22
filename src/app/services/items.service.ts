import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { item } from "../interfaces/data.interface";

@Injectable({
    providedIn: 'root'
})

export class ItemsService {

    private urlItems = 'http://localhost:2100/item';
    constructor(private http: HttpClient) { }
    
    getItems(): Observable<item[]>{
        return this.http.get<item[]>(this.urlItems);
    }
    editItem(x:item): Observable<item>{
        return this.http.put<item>(this.urlItems+'/'+x.id,x);
    }
    insertItem(x:item):Observable<item>{
        return this.http.post<item>(this.urlItems,x);
    }
    deleteItem(x:item):Observable<item>{
        return this.http.delete<item>(this.urlItems+'/'+x.id);
    }
}