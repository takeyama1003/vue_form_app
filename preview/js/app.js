(function() {
  'use strict';

  //radio
  const typeRadio = Vue.component('type-radio', {
    props: {
      type: {
        type: String,
        default: ''
      },
      key2: {
        type: Number,
        default: ''
      },
      answer: {
        type: Array,
        default: ''
      },
      question: {
        type: String,
        default: ''
      },
      microcopy1: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: ''
      },
      columntype: {
        type: String,
        default: ''
      },
    },
    template: `
      <div class="question">
      <div class="content-header"><span>質問{{ key2 }}：Radio</span><span v-on:click="deleteContent()">✖</span></div>
      <div class="question-list">必須<input type="checkbox" v-on:change="changeRequired()" v-model="radioRequired"></div>
      <div class="question-list"><dl><dt>質問</dt><dd><textarea class="question-text" v-on:change="changeText()" v-model="radioQuestion"></textarea></dd></dl></div>
      <div class="question-list"><dl><dt>補足</dt><dd><textarea class="microcopy1" v-on:change="changeText()" v-model="radioMicrocopy1"></textarea></dd></dl></div>

      <div class="question-list">回答の列数
        <select class="input-type-select" v-on:change="changeColumnType()" v-model="columnType">
        <option value="col1">1列</option>
        <option value="col2">2列</option>
        <option value="col3">3列</option>
        </select>
      </div>

      <ul class="answer-list">
        <li
          v-for="(item, i) in answer"
          :key="i"
          >回答{{ i+1 }}<input type="text" v-bind:value="item.label" v-on:change="changeAnswerText(i, $event)"><button type="button" v-on:click="deleteAnswer(i)">削除</button>
          タグコード <i class="fa-solid fa-circle-exclamation attention"></i>
    <div class="fukidashi">こちらの回答を選択したときにここで設定したタグが付与されます</div><input type="text" class="tag_add" v-bind:value="item.tag" v-on:change="changeAnswerTag(i, $event)">
        </li>
      </ul>
      <button type="button" v-on:click="addAnswer()">＋回答追加</button>
      </div>
      `,
      data(){
        return {
          radioRequired: this.required,
          radioQuestion: this.question,
          radioMicrocopy1: this.microcopy1,
          // radioAnswer: '',
          // radioAnswerTag: '',
          answerList: this.answer,
          columnType: this.columntype,
        }
      },
      methods: {
        addAnswer: function() {
          var key2 = this.key2;
            var item = {
              label: '',
              tag: '',
            };
            this.$emit('answerlist', item, key2);
        },
        deleteAnswer: function(i) {
          var key2 = this.key2;
            this.$emit('deletelist', key2, i);
        },
        changeText: function() {
            var key2 = this.key2;
            this.$emit('radioquestion', this.radioQuestion, key2);
            this.$emit('radiomicrocopy1', this.radioMicrocopy1, key2);
        },
        changeRequired: function() {
            var key2 = this.key2;
            this.$emit('radiorequired', this.radioRequired, key2);
        },
        changeColumnType: function() {
          var key2 = this.key2;
          this.$emit('columntype', this.columnType, key2);
        },
        changeAnswerText: function(i,e) {
          var key2 = this.key2;
          console.log(e);
          console.log(key2);
          console.log(i);
          this.$emit('radioanswer', e.target.value, key2, i);
        },
        changeAnswerTag: function(i,e) {
          var key2 = this.key2;
          this.$emit('answertag', e.target.value, key2, i);
        },
        deleteContent: function() {
          var key2 = this.key2;
            this.$emit('deletecontent', key2);
        },
      },
  });

  //checkbox
  const typeCheckbox = Vue.component('type-checkbox', {
    props: {
      type: {
        type: String,
        default: ''
      },
      key2: {
        type: Number,
        default: ''
      },
      answer: {
        type: Array,
        default: ''
      },
      question: {
        type: String,
        default: ''
      },
      microcopy1: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: ''
      },
      columntype: {
        type: String,
        default: ''
      },
    },
    template: `
      <div class="question">
      <div class="content-header"><span>質問{{ key2 }}：Checkbox</span><span v-on:click="deleteContent()">✖</span></div>
      <div class="question-list">必須<input type="checkbox" v-on:change="changeRequired()" v-model="checkRequired"></div>
      <div class="question-list"><dl><dt>質問</dt><dd><textarea class="question-text" v-on:change="changeText()" v-model="checkQuestion"></textarea></dd></dl></div>
      <div class="question-list"><dl><dt>補足</dt><dd><textarea class="microcopy1" v-on:change="changeText()" v-model="checkMicrocopy1"></textarea></dd></dl></div>
      <div class="question-list">回答の列数
        <select class="input-type-select" v-on:change="changeColumnType()" v-model="columnType">
        <option value="col1">1列</option>
        <option value="col2">2列</option>
        <option value="col3">3列</option>
        </select>
      </div>
      <ul class="answer-list">
        <li
          v-for="(item, i) in answer"
          :key="i"
        >回答{{ i+1 }}<input type="text" v-bind:value="item.label" v-on:change="changeAnswerText(i, $event)"><button type="button" v-on:click="deleteAnswer(i)">削除</button>
        タグコード <i class="fa-solid fa-circle-exclamation attention"></i>
    <div class="fukidashi">こちらの回答を選択したときにここで設定したタグが付与されます</div><input type="text" class="tag_add" v-bind:value="item.tag" v-on:change="changeAnswerTag(i, $event)">
        </li>
      </ul>
      <button type="button" v-on:click="addAnswer()">＋回答追加</button>
      </div>
      `,
    data(){
      return {
        checkRequired: this.required,
        checkQuestion: this.question,
        checkMicrocopy1: this.microcopy1,
        // checkAnswer: '',
        answerList: this.answer,
        columnType: this.columntype,
      }
    },
    methods: {
      addAnswer: function() {
        var key2 = this.key2;
          var item = {
            label: '',
            tag: '',
          };
          this.$emit('answerlist', item, key2);
      },
      deleteAnswer: function(i) {
        var key2 = this.key2;
          this.$emit('deletelist', key2, i);
      },
      changeText: function() {
          var key2 = this.key2;
          this.$emit('checkquestion', this.checkQuestion, key2);
          this.$emit('checkmicrocopy1', this.checkMicrocopy1, key2);
      },
      changeRequired: function() {
          var key2 = this.key2;
          this.$emit('checkrequired', this.checkRequired, key2);
      },
      changeColumnType: function() {
        var key2 = this.key2;
        this.$emit('columntype', this.columnType, key2);
      },
      changeAnswerText: function(i,e) {
        var key2 = this.key2;
        console.log(e);
        console.log(key2);
        console.log(i);
        this.$emit('checkanswer', e.target.value, key2, i);
      },
      changeAnswerTag: function(i,e) {
        var key2 = this.key2;
        this.$emit('answertag', e.target.value, key2, i);
      },
      deleteContent: function() {
        var key2 = this.key2;
          this.$emit('deletecontent', key2);
      },
    },
  });

  //select
  const typeSelect = Vue.component('type-select', {
    props: {
      type: {
        type: String,
        default: ''
      },
      key2: {
        type: Number,
        default: ''
      },
      answer: {
        type: Array,
        default: ''
      },
      question: {
        type: String,
        default: ''
      },
      microcopy1: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: ''
      },
    },
    template: `
    <div class="question">
    <div class="content-header"><span>質問{{ key2 }}：Select</span><span v-on:click="deleteContent()">✖</span></div>
    <div class="question-list">必須<input type="checkbox" v-on:change="changeRequired()" v-model="selectRequired"></div>
    <div class="question-list"><dl><dt>質問</dt><dd><textarea class="question-text" v-on:change="changeText()" v-model="selectQuestion"></textarea></dd></dl></div>
    <div class="question-list"><dl><dt>補足</dt><dd><textarea class="microcopy1" v-on:change="changeText()" v-model="selectMicrocopy1"></textarea></dd></dl></div>
    <ul class="answer-list">
      <li
        v-for="(item, i) in answer"
        :key="i"
      >回答{{ i+1 }}<input type="text" v-bind:value="item.label" v-on:change="changeAnswerText(i, $event)"><button type="button" v-on:click="deleteAnswer(i)">削除</button>
      タグコード <i class="fa-solid fa-circle-exclamation attention"></i>
    <div class="fukidashi">こちらの回答を選択したときにここで設定したタグが付与されます</div><input type="text" class="tag_add" v-bind:value="item.tag" v-on:change="changeAnswerTag(i, $event)">
      </li>
    </ul>
    <button type="button" v-on:click="addAnswer()">＋回答追加</button>
    </div>
    `,
    data(){
      return {
        selectRequired: this.required,
        selectQuestion: this.question,
        selectMicrocopy1: this.microcopy1,
        // selectAnswer: '',
        answerList: this.answer,
      }
    },
    methods: {
      addAnswer: function() {
        var key2 = this.key2;
          var item = {
            label: '',
            tag: '',
          };
          this.$emit('answerlist', item, key2);
      },
      deleteAnswer: function(i) {
        var key2 = this.key2;
          this.$emit('deletelist', key2, i);
      },
      changeText: function() {
          var key2 = this.key2;
          this.$emit('selectquestion', this.selectQuestion, key2);
          this.$emit('selectmicrocopy1', this.selectMicrocopy1, key2);
      },
      changeRequired: function() {
          var key2 = this.key2;
          this.$emit('selectrequired', this.selectRequired, key2);
      },
      changeAnswerText: function(i,e) {
        var key2 = this.key2;
        console.log(e);
        console.log(key2);
        console.log(i);
        this.$emit('selectanswer', e.target.value, key2, i);
      },
      changeAnswerTag: function(i,e) {
        var key2 = this.key2;
        this.$emit('answertag', e.target.value, key2, i);
      },
      deleteContent: function() {
        var key2 = this.key2;
          this.$emit('deletecontent', key2);
      },
    },
  });

  //text
  const typeText = Vue.component('type-text', {
    props: {
      type: {
        type: String,
        default: ''
      },
      key2: {
        type: Number,
        default: ''
      },
      question: {
        type: String,
        default: ''
      },
      microcopy1: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      texttype: {
        type: String,
        default: ''
      },
    },
    template: `
    <div class="question">
    <div class="content-header"><span>質問{{ key2 }}：Text</span><span v-on:click="deleteContent()">✖</span></div>
    <div class="question-list">必須<input type="checkbox" v-on:change="changeRequired()" v-model="textRequired"></div>
    <div class="question-list">入力タイプ <i class="fa-solid fa-circle-exclamation attention"></i>
    <div class="fukidashi">入力タイプを指定することでECAIの会員情報と紐づけることができます</div>
    <select class="input-type-select" v-on:change="changeTextType()" v-model="textType">
    <option value="text">指定なし</option>
    <option value="name">名前</option>
    <option value="email">メール</option>
    <option value="tel">電話番号</option>
    </select></div>
    
    <div class="question-list"><dl><dt>質問</dt><dd><textarea class="question-text" v-on:change="changeText()" v-model="textQuestion"></textarea></dd></dl></div>
    <div class="question-list"><dl><dt>補足</dt><dd><textarea class="microcopy1" v-on:change="changeText()" v-model="textMicrocopy1"></textarea></dd></dl></div>
    <div class="question-list">入力例<input type="text" v-on:change="changeText()" v-model="textPlaceholder"></div>
    </div>
    `,
    data(){
      return {
        textRequired: this.required,
        textQuestion: this.question,
        textMicrocopy1: this.microcopy1,
        textPlaceholder: this.placeholder,
        textType: this.texttype,
      }
    },
    methods: {
      changeText: function() {
          var key2 = this.key2;
          this.$emit('textquestion', this.textQuestion, key2);
          this.$emit('textmicrocopy1', this.textMicrocopy1, key2);
          this.$emit('textplaceholder', this.textPlaceholder, key2);
      },
      changeRequired: function() {
          var key2 = this.key2;
          this.$emit('textrequired', this.textRequired, key2);
      },
      changeTextType: function() {
          var key2 = this.key2;
          this.$emit('texttype', this.textType, key2);
      },
      deleteContent: function() {
        var key2 = this.key2;
          this.$emit('deletecontent', key2);
      },
    },
  });

  //textarea
  const typeTextarea = Vue.component('type-textarea', {
    props: {
      type: {
        type: String,
        default: ''
      },
      key2: {
        type: Number,
        default: ''
      },
      question: {
        type: String,
        default: ''
      },
      microcopy1: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
    },
    template: `
    <div class="question">
    <div class="content-header"><span>質問{{ key2 }}：Textarea</span><span v-on:click="deleteContent()">✖</span></div>
    <div class="question-list">必須<input type="checkbox" v-on:change="changeRequired()" v-model="textRequired"></div>
    <div class="question-list"><dl><dt>質問</dt><dd><textarea class="question-text" v-on:change="changeText()" v-model="textQuestion"></textarea></dd></dl></div>
    <div class="question-list"><dl><dt>補足</dt><dd><textarea class="microcopy1" v-on:change="changeText()" v-model="textMicrocopy1"></textarea></dd></dl></div>
    <div class="question-list">入力例<input type="text" v-on:change="changeText()" v-model="textPlaceholder"></div>
    </div>
    `,
    data(){
      return {
        textRequired: this.required,
        textQuestion: this.question,
        textMicrocopy1: this.microcopy1,
        textPlaceholder: this.placeholder,
      }
    },
    methods: {
      changeText: function() {
          var key2 = this.key2;
          this.$emit('textquestion', this.textQuestion, key2);
          this.$emit('textmicrocopy1', this.textMicrocopy1, key2);
          this.$emit('textplaceholder', this.textPlaceholder, key2);
      },
      changeRequired: function() {
          var key2 = this.key2;
          this.$emit('textrequired', this.textRequired, key2);
      },
      deleteContent: function() {
        var key2 = this.key2;
          this.$emit('deletecontent', key2);
      },
    },
  });


  ////////////////////
  ///// new Vue /////
  ////////////////////
  new Vue({
    el: '#app',
    components: {
      'type-radio': typeRadio,
      'type-checkbox': typeCheckbox,
      'type-select': typeSelect,
      'type-text': typeText,
      'type-textarea': typeTextarea,
    },
    data() {
      return{
        tabTitle: '',
        headerTitle: '',
        headerImage: '',
        headerText: '',
        sendBtnText: '',
        sendBtnLink: '',
        tagCode: '',
        contentType: '',
        completeTabTitle: '',
        completeHeaderTitle: '',
        completeHeaderText: '',
        closeBtnText: '',
        closeBtnLink: '',
        imagePath: '',
        isVisible: {
          content1: false, // コンテンツ1の初期状態
          content2: false, // コンテンツ2の初期状態
        },
        contents: [],//ローカルストレージのキーに設定するため、このcontentsの中にデータをすべてを格納している
      }
    },
    created() {
      // URLからパラメーターを取得
      const params = new URLSearchParams(window.location.search);
      const successPath = params.get('success');

      // パラメーターが存在する場合にのみ設定
      if (successPath) {
          this.imagePath = decodeURIComponent(successPath);

          //successパラメーターに/form_app/v2.3.0/uploads/img_xxx.pngのようなパスを渡したい場合は以下のように修正できます。
          this.imagePath = window.location.origin + '/form_app/v2.3.0/' + decodeURIComponent(successPath);

          console.log(this.imagePath);

      }
  },

    watch: {
      contents: {
        handler: function() {//オプションを使えるようにする
          //contentsをローカルストレージに格納
          localStorage.setItem('contents', JSON.stringify(this.contents));
        },
        deep: true//入れ子も監視
      }
    },
    mounted: function() {//DOMが読み込まれた直後のタイミング
      //ローカルストレージのデータをdataのcontentsに格納
      if(JSON.parse(localStorage.getItem('contents'))){
        this.contents = JSON.parse(localStorage.getItem('contents'));
      }else{
        this.contents = [];
        var item = {
          tabTitle: '',
          headerTitle: '',
          headerImage: '',
          headerText: '',
          sendBtnText: '',
          sendBtnLink: '',
          tagCode: '',
          completeTabTitle: '',
          completeHeaderTitle: '',
          completeHeaderText: '',
          closeBtnText: '',
          closeBtnLink: '',
          imagePath: '',
          isVisible: {
            content1: false,
            content2: false,
          },
        };
        this.contents.push(item);
      }
      //dataにdataのcontents[]以外の部分をセットしている
      this.tabTitle = this.contents[0].tabTitle;
      this.headerTitle = this.contents[0].headerTitle;
      // this.headerImage = this.contents[0].headerImage;
      this.headerText = this.contents[0].headerText;
      this.sendBtnText = this.contents[0].sendBtnText;
      this.sendBtnLink = this.contents[0].sendBtnLink;
      this.tagCode = this.contents[0].tagCode;
      this.completeTabTitle = this.contents[0].completeTabTitle;
      this.completeHeaderTitle = this.contents[0].completeHeaderTitle;
      this.completeHeaderText = this.contents[0].completeHeaderText;
      this.closeBtnText = this.contents[0].closeBtnText;
      this.closeBtnLink = this.contents[0].closeBtnLink;
      this.imagePath = this.contents[0].imagePath;
      // this.contents[0].imagePath = this.imagePath;
      // this.isVisible.content1 = this.contents[0].isVisible.content1;
      // this.isVisible.content2 = this.contents[0].isVisible.content2;
  
    },
    methods: {
      toggleVisibility(contentKey) {
        // 指定されたキー（content1, content2, content3）の状態をトグル
        this.isVisible[contentKey] = !this.isVisible[contentKey];
      },
      addParts: function() {
        var array = {
          tabTitle: this.tabTitle,
          headerTitle: this.headerTitle,
          headerImage: this.headerImage,
          headerText: this.headerText,
          sendBtnText: this.sendBtnText,
          sendBtnLink: this.sendBtnLink,
          tagCode: this.tagCode,
          completeTabTitle: this.completeTabTitle,
          completeHeaderTitle: this.completeHeaderTitle,
          completeHeaderText: this.completeHeaderText,
          closeBtnText: this.closeBtnText,
          closeBtnLink: this.closeBtnLink,
          imagePath: this.imagePath,
        };
        this.contents.splice(0, 1, array);//0番目から1つ目を変換
      },
      addContent: function(e) {
          this.contentType = e.target.value;
          var item = {
            // id: ,
            type: this.contentType,
            question:"",
            microcopy:"",
            answer:[{
                label: '',
                tag:'',
              }],
            required: false,
            placeholder: "",
            texttype: "text",
            columntype: "col1",
          };
          this.contents.push(item);
          this.contentType = '';
          document.getElementById('add-content').selectedIndex = 0;
      },
      sendAnswerlist: function(e, key2){
        console.log(key2);
        this.contents[key2].answer.push(e);
      },
      sendDeletelist: function(key2, i){
        console.log(key2);
        console.log(i);
        this.contents[key2].answer.splice( i, 1 );
      },
      sendDeleteContent: function(key2){
        console.log(key2);
        this.contents.splice( key2, 1 );
      },
      //radio
      sendRadioQuestion: function(e, key2){
        this.contents[key2].question = e;
      },
      sendRadioMicrocopy1: function(e, key2){
        this.contents[key2].microcopy = e;
      },
      sendRadioRequired: function(e, key2){
        this.contents[key2].required = e;
      },
      sendRadioAnswer: function(e, key2, i){
        this.contents[key2].answer[i].label = e;
      },
      sendAnswerTag: function(e, key2, i){
        this.contents[key2].answer[i].tag = e;
      },
      sendColumnType: function(e, key2){
        this.contents[key2].columntype = e;
      },
      //checkbox
      sendCheckQuestion: function(e, key2){
        this.contents[key2].question = e;
      },
      sendCheckMicrocopy1: function(e, key2){
        this.contents[key2].microcopy = e;
      },
      sendCheckRequired: function(e, key2){
        this.contents[key2].required = e;
      },
      sendCheckAnswer: function(e, key2, i){
        this.contents[key2].answer[i].label = e;
      },
      //select
      sendSelectQuestion: function(e, key2){
        this.contents[key2].question = e;
      },
      sendSelectMicrocopy1: function(e, key2){
        this.contents[key2].microcopy = e;
      },
      sendSelectRequired: function(e, key2){
        this.contents[key2].required = e;
      },
      sendSelectAnswer: function(e, key2, i){
        this.contents[key2].answer[i].label = e;
      },
      //text
      sendTextQuestion: function(e, key2){
        this.contents[key2].question = e;
      },
      sendTextMicrocopy1: function(e, key2){
        this.contents[key2].microcopy = e;
      },
      sendTextRequired: function(e, key2){
        this.contents[key2].required = e;
      },
      sendTextPlaceholder: function(e, key2){
        this.contents[key2].placeholder = e;
      },
      sendTextType: function(e, key2){
        this.contents[key2].texttype = e;
      },
    },

  });
})();

