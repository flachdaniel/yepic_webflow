

const BaseButton = {
    template : `
    <button :disabled="disabled" id="pageButton" class="link-paginate w-inline-block">
      <slot />
    </button>`
  ,

  data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
},

    props: ["disabled"],
  };


  const BasePaginationTrigger = {
    template : `
    <span class="base-pagination-trigger" @click="onClick">
      {{ pageNumber }}
    </span>
    `,
    props : ["pageNumber"], 
    methods : {
      onClick() {
        this.$emit("loadPage", this.pageNumber);
      }
    }, 
  };


  const BasePagination = {
    name: "basepagination",
    template: `
    <div class="container">
          <div class="vidgallery-pagination">
    
      <div class="base-pagination">
        <BaseButton v-bind:style="styleObject"
          :disabled="isPreviousButtonDisabled"
          @click.native="previousPage"
        >
          <
        </BaseButton>
      </div>
    
        <BasePaginationTrigger
          v-for="paginationTrigger in paginationTriggers"
          :class="{
            'base-pagination__description--current':
              paginationTrigger === currentPage
          }"
          :key="paginationTrigger"
          :pageNumber="paginationTrigger"
          class="base-pagination__description--other"
          @loadPage="onLoadPage"
        />
    
        <div class="base-pagination">
        <BaseButton :disabled="isNextButtonDisabled" @click.native="nextPage">
      >
        </BaseButton>
      </div>
      
    </div>
        </div>    
  `
  ,

    components: {
      BaseButton,
      BasePaginationTrigger
    },

    props: {
      currentPage: {
        type: Number,
        required: true
      },

      pageCount: {
        type: Number,
        required: true
      },

    },

    computed: {
      isPreviousButtonDisabled() {
        return this.currentPage === 1;
      },

      isNextButtonDisabled() {
        return this.currentPage === this.pageCount;
      },

      paginationTriggers() {
        const currentPage = this.currentPage;
        const pageCount = this.pageCount;
        const visiblePagesCount = this.pageCount > 1 ? (this.pageCount > 8 ? 9 : this.pageCount) : 0 ;
        const visiblePagesThreshold = (visiblePagesCount - 1) / 2;
        const pagintationTriggersArray = Array(visiblePagesCount - 1).fill(
          0
        );

        if (currentPage <= visiblePagesThreshold + 1) {
          pagintationTriggersArray[0] = 1;
          const pagintationTriggers = pagintationTriggersArray.map(
            (paginationTrigger, index) => {
              return pagintationTriggersArray[0] + index;
            }
          );

          pagintationTriggers.push(pageCount);

          return pagintationTriggers;
        }

        if (currentPage >= pageCount - visiblePagesThreshold + 1) {
          const pagintationTriggers = pagintationTriggersArray.map(
            (paginationTrigger, index) => {
              return pageCount - index;
            }
          );

          pagintationTriggers.reverse().unshift(1);

          return pagintationTriggers;
        }

        pagintationTriggersArray[0] = currentPage - visiblePagesThreshold + 1;
        const pagintationTriggers = pagintationTriggersArray.map(
          (paginationTrigger, index) => {
            return pagintationTriggersArray[0] + index;
          }
        );

        pagintationTriggers.unshift(1);
        pagintationTriggers[pagintationTriggers.length - 1] = pageCount;

        return pagintationTriggers;
      }
    }
    ,
    methods: {
      nextPage() {
        this.$emit("nextPage");
      },

      onLoadPage(value) {
        this.$emit("loadPage", value);
      },

      previousPage() {
        this.$emit("previousPage");
      }
    }
  };




  const videoObject = {

  template:  `            

 <div class="video-item">
     <div class="gallery-video-left">
         <div class="video-preview">
             <video controls>
                 <source :src="value.video_url">
             </video>
             <div class="eye-wrap"></div>
         </div>
         <div class="display-flex dir-vert justify-sb">
             <div>
                 <h2 class="t-16-bold-cap">Video Title</h2>
                 <p id="videoName" class="p-template">{{value.video_name}}</p>
             </div>
             <div>
                 <h2 class="t-16-bold-cap">Script</h2>
                 <p id="script" class="p-template">{{value.script}}</p>
             </div>
             <div class="tab-buttons">
                 <a :href="value.unique_webpage" class="button w-inline-block">
                     <div>Preview</div>
                 </a>
                 <a href="#" class="button-light unavailable w-inline-block">
                     <div>Edit</div>
                 </a>
                 <a :href="value.download_url" class="button button-gallery-share w-inline-block">
                     <div class="w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="19.079" height="19.079">
                             <path d="m9.54 13.779 5.3-6.36h-3.18V0H7.42v7.419H4.24Zm-7.419 3.18v-8.48H.001v8.479a2.126 2.126 0 0 0 2.12 2.12h14.838a2.126 2.126 0 0 0 2.12-2.119v-8.48h-2.12v8.479Z" fill="currentColor"></path>
                         </svg></div>
                 </a>
             </div>
         </div>
     </div>
     <div class="gallery-video-right">
         <div class="separator-vidgallery display-none-tab"></div>
         <div class="display-flex dir-vert _w-100">
             <div class="t-16-bold-cap">Details</div>
             <div class="properties-wrap">
                 <div class="margin-bottom margin-s">
                     <div class="t-preview-var">Actor:</div>
                     <div id="actor">{{value.actor}}</div>
                 </div>
                 <div class="margin-bottom margin-s">
                     <div class="t-preview-var">Length:</div>
                     <div id="length">{{value.video_length}}</div>
                 </div>
                 <div class="margin-bottom margin-s">
                     <div class="t-preview-var">Size:</div>
                     <div id="size">{{value.video_file_size}}</div>
                 </div>
                 <div class="margin-bottom margin-s">
                     <div class="t-preview-var">Created on:</div>
                     <div id="createdOn">{{value.video_created}}</div>
                 </div>
             </div>
         </div>
     </div>
 </div>

  `,
  methods: {

    downloadVideo(videoUrl) {
  	let headers = new Headers();
    fetch(videoUrl, {
        method: 'GET',
    })
    .then(response => response.blob())
    .then(function(myBlob) {
      var objectURL = URL.createObjectURL(myBlob);
      var tag = document.createElement('a');
      tag.href = objectURL;
      tag.target = '_blank';
      tag.download = videoUrl.replace('https://storage.googleapis.com/yepic-generated-videos/', '');
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    });
  },

  testFunction(){
    alert("HEEELLLLO!!!")
    console.log("HEEELOOO!")

  }

  },
  
    
  props : ['value', 'src']
  };




  const VideoList = {

    name : "VideoList", 
    template : `    <div>
    <video-object v-for="value in videos[currentPage] "  v-bind:value="value" v-bind:key="value.video_name"  >
    </video-object>
    <base-pagination
    :current-page="currentPage"
    :page-count="pageCount"
    class="articles-list__pagination"
    @nextPage="pageChangeHandle('next');"
    @previousPage="pageChangeHandle('previous');"
    @loadPage="pageChangeHandle"
  > </base-pagination>
  </div> `
  ,

  components:{
    videoObject, 
    BasePagination,
  },

  methods: {
      async pageChangeHandle(value) {
        switch (value) {
          case "next":
            this.currentPage += 1;
            console.log(this.currentPage)
            break;
          case "previous":
            this.currentPage -= 1;
            console.log(this.currentPage)
            break;
          default:
            this.currentPage = value;
            console.log(this.currentPage)
            break;
        }

      }},
  props: {
      currentPage: {
        type: Number,
        required: true
      },

      pageCount: {
        type: Number,
        required: true
      },
      videos: {
        type: Object,
        required: true
      }
    },
    
  }


  new Vue({
  el: '#app',
  static: {
      visibleItemsPerPageCount: 10 // custom
    },

  data () {
    return {
      videos: null,
      pageCount: 0,
      currentPage: 1,
    }
  },
  components:{
    VideoList

  },
  mounted () {
    axios
    .get('https://airtable-db-dot-speech2vid-api.nw.r.appspot.com//video/user/' + formValues.id)
      .then(response => (this.videos = response.data.pages,  this.pageCount = response.data._meta.pages))

  },

  })
