import { LightningElement, api,track } from 'lwc';

export default class MyNewCovidApp extends LightningElement {
    @api global ={}
    @api countries = []
    @api Asc = []
    @api Desc = []
    ready = false;

    connectedCallback(){
        this.fetchData();
        setTimeout(() => { 
            this.ready = true;
            this.Descend();
            this.Ascend();
            
        }, 1000);
        
    }
   
    @api
    async fetchData(){
        let response = await fetch('https://api.covid19api.com/summary');

        if (response.ok) { 
            var json = await response.json();
            this.global = {...json.Global}
            this.countries = [...json.Countries]
            console.log('table: ',this.countries)

        } else {
            alert("HTTP-Error: " + response.status);
    }
}

Descend(){
    let sorted = [...this.countries]
    //DESCENDING
    this.Desc = sorted.sort((a,b) => {return a.TotalConfirmed - b.TotalConfirmed})
    console.log('DESC: ', this.Desc);   
}

Ascend(){
    let sorted = [...this.countries]
    //DESCENDING
    this.Asc = sorted.sort((a,b) => {return a.TotalConfirmed - b.TotalConfirmed}).reverse()
    console.log('ASC: ', this.Asc);
}



@track sortState = true;
handleLikeButtonClick() {
    this.sortState = !this.sortState 
   // this.sortState === !this.sortState ? console.log('desc :',this.Desc) : console.log('asc :', this.Asc) 
}
}