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
  srcs:any[]=[];
  contents:any[]=[];
  scrapedText: string[] = [];
  scrapedTextVisible: boolean[] = [];



  constructor(private fb:FormBuilder ,private scrapingService:ScrapingService){
    let formControls={
      url:new FormControl()
    }
    this.ScrapingUrls=this.fb.group(formControls)
  }

  get url_input(){return this.ScrapingUrls.get('url_input')}

  ngOnInit():void{
    this.Scraping()
  }


toggleScrapedText(index: number) {
  this.scrapedTextVisible[index] = !this.scrapedTextVisible[index];


}
  Scraping(){

    console.log(this.ScrapingUrls.value);
    this.loading = true;
    let donnee=this.ScrapingUrls.value;
    const startTime = Date.now();
    this.scrapingService.PostData(donnee).subscribe(
      res=>{

        this.dataUrls=res;
       console.log(this.dataUrls);
      this.srcs.push(this.dataUrls.sources);
       this.contents.push(this.dataUrls.content);
       console.log(this.contents[1]);
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


    setTimeout(() => {
      this.preloader = false;
    }, 4500);
}

}
