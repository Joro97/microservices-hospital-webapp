import { Component, OnInit } from '@angular/core';
import {FileService} from '../../core/services/file.service';
import {AuthenticationService} from '../../core/services/authentication.service';
import {LesionDetectionService} from '../../core/services/lesion.detection.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-doctor-lesion-detection',
  templateUrl: './doctor-lesion-detection.component.html',
  styleUrls: ['./doctor-lesion-detection.component.css']
})

export class DoctorLesionDetectionComponent implements OnInit {

  private lesionImage: File;
  public isImageUploaded: boolean;
  public uploadedFile: any;
  private retrievedInfo:boolean;

  private loading:boolean;

  private tumorType:string;
  private certainty:number;
  private tumorInfo:string;

  private info:any = {
    "nv":"Melanocytic nevi are benign neoplasms of melanocytes and appear in a myriad of variants, which all are included in our series. The variants may differ significantly from a dermatoscopic point of view. [6705 images]",
    "mel":"Melanoma is a malignant neoplasm derived from melanocytes that may appear in different variants. If excised in an early stage it can be cured by simple surgical excision. Melanomas can be invasive or non-invasive (in situ). We included all variants of melanoma including melanoma in situ, but did exclude non-pigmented, subungual, ocular or mucosal melanoma. [1113 images]",
    "bkl":"\"Benign keratosis\" is a generic class that includes seborrheic ker- atoses (\"senile wart\"), solar lentigo - which can be regarded a flat variant of seborrheic keratosis - and lichen-planus like keratoses (LPLK), which corresponds to a seborrheic keratosis or a solar lentigo with inflammation and regression [22]. The three subgroups may look different dermatoscop- ically, but we grouped them together because they are similar biologically and often reported under the same generic term histopathologically. From a dermatoscopic view, lichen planus-like keratoses are especially challeng- ing because they can show morphologic features mimicking melanoma [23] and are often biopsied or excised for diagnostic reasons. [1099 images]",
    "bcc":"Basal cell carcinoma is a common variant of epithelial skin cancer that rarely metastasizes but grows destructively if untreated. It appears in different morphologic variants (flat, nodular, pigmented, cystic, etc) [21], which are all included in this set. [514 images]",
    "akiec":"Actinic Keratoses (Solar Keratoses) and intraepithelial Carcinoma (Bowen’s disease) are common non-invasive, variants of squamous cell car- cinoma that can be treated locally without surgery. Some authors regard them as precursors of squamous cell carcinomas and not as actual carci- nomas. There is, however, agreement that these lesions may progress to invasive squamous cell carcinoma - which is usually not pigmented. Both neoplasms commonly show surface scaling and commonly are devoid of pigment. Actinic keratoses are more common on the face and Bowen’s disease is more common on other body sites. Because both types are in- duced by UV-light the surrounding skin is usually typified by severe sun damaged except in cases of Bowen’s disease that are caused by human papilloma virus infection and not by UV. Pigmented variants exists for Bowen’s disease [19] and for actinic keratoses [20]. Both are included in this set. [327 images]",
    "vasc":"Vascular skin lesions in the dataset range from cherry angiomas to angiokeratomas [25] and pyogenic granulomas [26]. Hemorrhage is also included in this category. [142 images]",
    "df":"Dermatofibroma is a benign skin lesion regarded as either a benign proliferation or an inflammatory reaction to minimal trauma. It is brown often showing a central zone of fibrosis dermatoscopically [24]. [115 images]"
  }

  constructor(
    private fileService: FileService,
    private lesionDetectionService: LesionDetectionService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.isImageUploaded = false;
    this.retrievedInfo = false;
    //DOM
    const $ = document.querySelector.bind(document);

    //APP
    let App:any = {};
    App.init = (function() {
      //Init
      function handleFileSelect(evt) {
        const files = evt.target.files; // FileList object

        //files template
        let template = `${Object.keys(files)
          .map(file => `<div class="file file--${file}">
        <div class="name"><span>${files[file].name}</span></div>
        <div class="progress active"></div>
        <div class="done">
      <a href="" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000">
        <g><path id="path" d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,967.7C241.7,967.7,32.3,758.3,32.3,500C32.3,241.7,241.7,32.3,500,32.3c258.3,0,467.7,209.4,467.7,467.7C967.7,758.3,758.3,967.7,500,967.7z M748.4,325L448,623.1L301.6,477.9c-4.4-4.3-11.4-4.3-15.8,0c-4.4,4.3-4.4,11.3,0,15.6l151.2,150c0.5,1.3,1.4,2.6,2.5,3.7c4.4,4.3,11.4,4.3,15.8,0l308.9-306.5c4.4-4.3,4.4-11.3,0-15.6C759.8,320.7,752.7,320.7,748.4,325z"</g>
        </svg>
                </a>
        </div>
        </div>`)
          .join("")}`;

        $("#drop").classList.add("hidden");
        $("footer").classList.add("hasFiles");
        $(".importar").classList.add("active");
        $("#importar2").classList.add("active");
        /*setTimeout(() => {
          $(".list-files").innerHTML = template;
        }, 1000);

        Object.keys(files).forEach(file => {
          let load = 2000; // fake load
          setTimeout(() => {
            $(`.file--${file}`).querySelector(".progress").classList.remove("active");
            $(`.file--${file}`).querySelector(".done").classList.add("anim");
          }, load);
        });*/
      }

      // trigger input
      $("#triggerFile").addEventListener("click", evt => {
        evt.preventDefault();
        $("input[type=file]").click();
      });

      // drop events
      $("#drop").ondragleave = evt => {
        $("#drop").classList.remove("active");
        evt.preventDefault();
      };
      $("#drop").ondragover = $("#drop").ondragenter = evt => {
        $("#drop").classList.add("active");
        evt.preventDefault();
      };
      $("#drop").ondrop = evt => {
        $("input[type=file]").files = evt.dataTransfer.files;
        $("footer").classList.add("hasFiles");
        $("#drop").classList.remove("active");
        evt.preventDefault();
      };

      //upload more
      //$(".importar").addEventListener("click", () => {
        
      //});

      // input change
      $("input[type=file]").addEventListener("change", handleFileSelect);
    })();

  }

  importerClick(event) {
    this.retrievedInfo = false;
    this.isImageUploaded = false;
    this.uploadedFile = null;
    const $ = document.querySelector.bind(document);
    //$(".list-files").innerHTML = "";
    $("footer").classList.remove("hasFiles");
    $(".importar").classList.remove("active");
    $("#importar2").classList.remove("active");
    setTimeout(() => {
      $("#drop").classList.remove("hidden");
    }, 500);
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      this.lesionImage = event.target.files[0];
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: Event) => { // called once readAsDataURL is completed
        this.uploadedFile = reader.result;
        this.isImageUploaded = true;
      };
    }
  }

  onSubmit(event) {
    this.loading = true;
    const token = this.authenticationService.getCurrentAccessToken();
    this.lesionDetectionService.detectLesion(this.lesionImage, token)
      .subscribe(data => {
        //alert(JSON.stringify(data));
        this.retrievedInfo = true;
        this.tumorType = data["class"];
        this.certainty = data["certainty"];
        this.tumorInfo = this.info[this.tumorType];

        this.notificationService.showSuccess("Diagnosed \"" + 
          this.tumorType + "\" with " + this.certainty + "% certainty", "Successful diagnosis!");
        console.log('Successfully detected lesion type!');

        setTimeout(()=>{
          this.loading = false;
        }, 1000)
      }, error => {
        this.notificationService.showError("Error: " + error.message, "Failed diagnosis!");
        console.log(`Could not detect lesion type!: Error: ${error}`);
        setTimeout(()=>{
          this.loading = false;
        }, 1000)
      });
  }
}
