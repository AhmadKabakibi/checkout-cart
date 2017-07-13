import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Collection } from "app/modules/collection/collection.module";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { CachcingServiceBase } from "./caching.service";

let count = 0;

@Injectable()
export class CollectionsDataService extends CachcingServiceBase {
  private collections: Observable<Collection[]>;

	public constructor(private http: Http) {
    super();
  }

  public all(): Observable<Collection[]> {
    return this.cache<Collection[]>(() => this.collections,
                                 (val: Observable<Collection[]>) => this.collections = val,
                                 () => this.http
                                           .get("./assets/collection.json")
                                           .map((response) => response.json()
                                                                      .map((item) => {
                                                                        let model = new Collection();
                                                                        model.updateFrom(item);
                                                                        return model;
                                                                      })));

  }
}
