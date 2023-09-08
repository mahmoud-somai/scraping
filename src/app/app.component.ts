import { Component, OnInit } from '@angular/core';
import { ScrapingService } from './scraping.service';
import { FormBuilder, FormControl, FormGroup ,ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  preloader=true;
  loading=false;
  title = 'stage_Front';
  ScrapingUrls: FormGroup ;
  dataUrls: any;
  scrapedText: string[] = [];
  scrapedTextVisible: boolean[] = [];
  allcontent:any;
  labels:any[]=[];
  eachcontent:any[]=[];
  itemcontent:any[]=[];
  datacontent:any[]=[];
  transformcontent:any[]=[];


  constructor(private fb:FormBuilder ,private scrapingService:ScrapingService){
    let formControls={
      url:new FormControl()
    }
    this.ScrapingUrls=this.fb.group(formControls)
    this.downloadJSON = this.downloadJSON.bind(this);
    this.downloadTXT = this.downloadTXT.bind(this);
  }

  downloadJSON() {
    const jsonContent = JSON.stringify(this.transformcontent, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }


  downloadTXT() {
    const jsonData = JSON.stringify(this.transformcontent, null, 2);
    const blob = new Blob([jsonData], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = 'transformcontent.txt';
    anchor.click();
  }


  get url_input(){return this.ScrapingUrls.get('url_input')}

  ngOnInit():void{

    setTimeout(() => {
      this.preloader = false;
    }, 4500);

  }


toggleScrapedText(index: number) {
  this.scrapedTextVisible[index] = !this.scrapedTextVisible[index];
}
  Scraping(){
    this.loading = true;
    let donnee=this.ScrapingUrls.value;
    this.labels = ["Content", "Source", "Language", "Title"];
    const startTime = Date.now();
    this.scrapingService.PostData(donnee).subscribe(
      (res)=>{
      this.allcontent=res;
      this.eachcontent.push(this.allcontent.content,this.allcontent.sources,this.allcontent.language,this.allcontent.title);
      this.datacontent.push(this.allcontent.Urlcontent);
       for (let i = 0; i < this.labels.length; i++) {
        this.itemcontent.push({
          label: this.labels[i],
          value: this.eachcontent[i], // Adjust the index as needed
        });
      }
      this.dataUrls=this.allcontent.urls;
      this.transformcontent.push(this.itemcontent,{label:"urls",value:this.allcontent.urls});
       const endTime = Date.now();
       const timeTaken = endTime - startTime;

       setTimeout(() => {
        this.loading = false;
      }, timeTaken-3000);
      },
      err=>{
        console.log(err);
      }
    );


}

}
