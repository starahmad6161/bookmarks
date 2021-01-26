import { Bookmark } from './../../core/interfaces/bookmark';
import { DbService } from './../../core/services/db.service';
import { AfterContentInit, Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCheck, faTimes, faPlus, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit, AfterViewInit {

  @ViewChild("filterSelect") filterSelect:ElementRef;
  @ViewChild("selectFilterBy") selectFilterBy:ElementRef;

  faCheck = faCheck;
  faPlus = faPlus;
  faSave = faSave;
  faEdit = faEdit;
  faTimes = faTimes;

  isEdit:boolean = false;
  itemID:string = "";
  deleteItemID:string = "";

  listItems:Array<Bookmark> = [];
  addLoading:boolean = false;
  showConfirmMsg:boolean = false;

  filterByKeyword:string = '';
  filterList = [];

  colorsList:Array<string> = ["js", "php"]
  randomColorList:Array<string> = ["color-1", "color-2", "color-3", "color-4", "color-5", "color-6", "color-7", "color-8", "color-8"];

  constructor(private _DbService:DbService) { }
  ngAfterViewInit(): void {
    this.getListItems('');
    this.loadFilters();
  }

  bookmarkForm = new FormGroup({
    keyword: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
    url: new FormControl(null),
    description: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
  }
  selectedFilterBy(value) {
    this.keyword.setValue(value);
  }

  get randomColor() {
    let index = Math.floor(Math.random() * (this.randomColorList.length - 1));
    let color = this.randomColorList[index];
    return color;
  }

  trackBy(index, item:Bookmark) {
    return item.id
  }

  getListItems(filterByKeyword = '') {
    if (filterByKeyword) {

      this._DbService.getListItemsFilterBy("bookmarks", filterByKeyword).subscribe((items) => {
        let listItems = items.map(item => {
          let keyword = item.payload.doc.data()["keyword"];
          return {
            id: item.payload.doc.id,
            ...<any>item.payload.doc.data(),
            url: item.payload.doc.data()["url"] ? this.getLinksAsArray(item.payload.doc.data()["url"]) : [],
            color: this.colorsList.includes(keyword)? keyword : this.randomColor
          }
        });
        this.listItems = listItems.sort((a, b)=> a.date - b.date);
      });
    } else {
      this._DbService.getListItems("bookmarks").subscribe((items) => {
        let listItems = items.map(item => {
          let keyword = item.payload.doc.data()["keyword"];
          return {
            id: item.payload.doc.id,
            ...<any>item.payload.doc.data(),
            url: item.payload.doc.data()["url"] ? this.getLinksAsArray(item.payload.doc.data()["url"]) : [],
            color: this.colorsList.includes(keyword)? keyword : this.randomColor
          }
        });
        this.listItems = listItems.sort((a, b)=> a.date - b.date);
      });
    }
  }

  getLinksAsArray(links:string) {
    return links.split(",").map(item => item.trim());
  }
  getLinksAsString(links:string[]) {
    return links.toString();
  }


  filterBy(value) {
    this.getListItems(value);
  }

  loadFilters() {

    this._DbService.getListItems("bookmarks").subscribe((items) => {
      let filterList = items.map(item => {
        return item.payload.doc.data()["keyword"];
      });
      this.filterList = Array.from(new Set(filterList));
    });
  }


  //Add New Todo
  addNewItem() {
    if (this.bookmarkForm.valid) {
      let item = {
        date: new Date(),
        keyword: (this.keyword.value).toLowerCase(),
        title: this.title.value,
        url: this.url.value,
        description: this.description.value,
      }
      this.addLoading = true;
      this._DbService.addNewItem("bookmarks", item).then(() => {
        this.reset();
        this.filterSelect.nativeElement.value = '';
        this.selectFilterBy.nativeElement.value = '';
        this.addLoading = false;
      }).catch(err => this.addLoading = false);
    }
  }


  get keyword() {
    return this.bookmarkForm.get("keyword");
  }
  get title() {
    return this.bookmarkForm.get("title");
  }
  get url() {
    return this.bookmarkForm.get("url");
  }
  get description() {
    return this.bookmarkForm.get("description");
  }
  reset() {
    this.bookmarkForm.reset({
      keyword: null,
      title: null,
      url: null,
      description: null
    });
    this.selectFilterBy.nativeElement.value = '';
  }

  openEdit(item:Bookmark) {
    this.isEdit = true;
    this.itemID = item.id;
    this.bookmarkForm.reset({
      keyword: item.keyword,
      title: item.title,
      url: this.getLinksAsString(item.url),
      description: item.description
    });
    window.scroll(0,0);
  }
  saveEdit() {
    let item = {
      keyword: this.keyword.value,
      title: this.title.value,
      url: this.url.value,
      description: this.description.value,
    }
    this.addLoading = true;
    this._DbService.saveEdit(this.itemID, item).then(() => {
      this.addLoading = false;
      this.isEdit = false;
      this.reset();
    }).catch(err => this.addLoading = false);
  }
  cancelEdit() {
    this.isEdit = false;
    this.reset();
  }
  deleteItemConfirm(itemID) {
    this.deleteItemID = itemID;
    this.showConfirmMsg = true;
  }

  deleteItem(event) {
    this.showConfirmMsg = false;
    if (event) {
      this.filterSelect.nativeElement.value = '';
      this.selectFilterBy.nativeElement.value = '';
      this._DbService.deleteItem('bookmarks', this.deleteItemID).then(() => {
        this.addLoading = false;
        this.getListItems();
      }).catch(err => this.addLoading = false);
    }
  }
}
