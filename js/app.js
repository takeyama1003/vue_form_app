(function() {
  'use strict';

  const typeQuestion  = Vue.component('type-question', {
    props: {
      type: {
        type: String,//"type-radio" または "type-select" または "type-checkbox"
      },
      key2: {
        type: Number,
      },
      answer: {
        type: Array,
      },
      question: {
        type: String,
      },
      microcopy1: {
        type: String,
      },
      required: {
        type: Boolean,
      },
      columntype: {
        type: String,
      },
    },
    computed: {
      isRadio() {
        return this.type === "type-radio";
      },
      isCheckbox() {
        return this.type === "type-checkbox";
      },
      isSelect() {
        return this.type === "type-select";
      }
    },
    template: `
      <div class="question">
      <div class="content-header">
        <span>質問{{ key2 }}：
          <span v-if="isRadio">Radio</span>
          <span v-else-if="isCheckbox">Checkbox</span>
          <span v-else-if="isSelect">Select</span>
        </span>
        <span v-on:click="deleteContent()">✖</span>
      </div>
      <div class="question-list">必須<input type="checkbox" v-on:change="changeRequired()" v-model="compRequired"></div>
      <div class="question-list"><dl><dt>質問</dt><dd><textarea class="question-text" v-on:change="changeText()" v-model="compQuestion"></textarea></dd></dl></div>
      <div class="question-list"><dl><dt>補足</dt><dd><textarea class="microcopy1" v-on:change="changeText()" v-model="compMicrocopy1"></textarea></dd></dl></div>

      <div class="question-list" v-if="isRadio || isCheckbox">回答の列数
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
          compRequired: this.required,
          compQuestion: this.question,
          compMicrocopy1: this.microcopy1,
          answerList: this.answer,
          columnType: this.columntype,
        }
      },
      mounted: function() {
        this.$emit('numberling');
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
            this.$emit('compquestion', this.compQuestion, key2);
            this.$emit('compmicrocopy1', this.compMicrocopy1, key2);
        },
        changeRequired: function() {
            var key2 = this.key2;
            this.$emit('comprequired', this.compRequired, key2);
        },
        changeColumnType: function() {
          var key2 = this.key2;
          this.$emit('columntype', this.columnType, key2);
        },
        changeAnswerText: function(i,e) {
          var key2 = this.key2;
          this.$emit('companswer', e.target.value, key2, i);
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
      },
      key2: {
        type: Number,
      },
      question: {
        type: String,
      },
      microcopy1: {
        type: String,
      },
      required: {
        type: Boolean,
      },
      placeholder: {
        type: String,
      },
      texttype: {
        type: String,
      },
    },
    computed: {
      isText() {
        return this.type === "type-text";
      },
      isTextarea() {
        return this.type === "type-textarea";
      },
    },
    template: `
    <div class="question">
    <div class="content-header">
      <span>質問{{ key2 }}：
          <span v-if="isText">Text</span>
          <span v-else="isTextarea">Textarea</span>
      </span>
      <span v-on:click="deleteContent()">✖</span>
    </div>
    <div class="question-list">必須<input type="checkbox" v-on:change="changeRequired()" v-model="compRequired"></div>

    <div class="question-list" v-if="isText">入力タイプ <i class="fa-solid fa-circle-exclamation attention"></i>
    <div class="fukidashi">入力タイプを指定することでECAIの会員情報と紐づけることができます</div>
    <select class="input-type-select" v-on:change="changeTextType()" v-model="textType">
    <option value="text">指定なし</option>
    <option value="name">名前</option>
    <option value="email">メール</option>
    <option value="tel">電話番号</option>
    </select></div>
    
    <div class="question-list"><dl><dt>質問</dt><dd><textarea class="question-text" v-on:change="changeText()" v-model="compQuestion"></textarea></dd></dl></div>
    <div class="question-list"><dl><dt>補足</dt><dd><textarea class="microcopy1" v-on:change="changeText()" v-model="compMicrocopy1"></textarea></dd></dl></div>
    <div class="question-list">入力例<input type="text" v-on:change="changeText()" v-model="textPlaceholder"></div>
    </div>
    `,
    data(){
      return {
        compRequired: this.required,
        compQuestion: this.question,
        compMicrocopy1: this.microcopy1,
        textPlaceholder: this.placeholder,
        textType: this.texttype,
      }
    },
    mounted: function() {
      this.$emit('numberling');
    },
    methods: {
      changeText: function() {
          var key2 = this.key2;
          this.$emit('compquestion', this.compQuestion, key2);
          this.$emit('compmicrocopy1', this.compMicrocopy1, key2);
          this.$emit('textplaceholder', this.textPlaceholder, key2);
      },
      changeRequired: function() {
          var key2 = this.key2;
          this.$emit('comprequired', this.compRequired, key2);
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


  ////////////////////
  ///// new Vue /////
  ////////////////////
  new Vue({
    el: '#app',
    components: {
      'type-question': typeQuestion,
      'type-text': typeText,
    },
    data() {
      return{
        contentType: '',
        contents: [{
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
          imagePath: '',//createdでデータはいる
          isVisible: {
            content1: false, // コンテンツ1の初期状態
            content2: false, // コンテンツ2の初期状態
          },
        }],
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
      const savedContents = localStorage.getItem('contents');
      if(savedContents){
        this.contents = JSON.parse(savedContents);
      }

      // URLからパラメーターを取得
      const params = new URLSearchParams(window.location.search);
      let successPath = params.get('success');

      // パラメーターが存在する場合にのみ設定
      if (successPath) {
          successPath = decodeURIComponent(successPath);
          this.contents[0].imagePath = window.location.origin + '/form_app/v2.4.1/' + successPath;
      }
    },
    methods: {
      toggleVisibility(contentKey) {
        // 指定されたキー（content1, content2, content3）の状態をトグル
        this.contents[0].isVisible[contentKey] = !this.contents[0].isVisible[contentKey];
      },
      deleteImage: function() {
        this.contents[0].imagePath = '';
        document.location = "index.php";
      },
      addContent: function() {
          var compType
          if(this.contentType == 'type-radio' || this.contentType == 'type-checkbox' || this.contentType == 'type-select'){
            compType = 'type-question';
          }else{
            compType = 'type-text';
          }
          var questionData = {
            id: '',
            type: this.contentType,
            comptype: compType,
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
          this.contents.push(questionData);
          this.contentType = '';
      },
      numberLing: function() {
        this.contents.forEach((item, index) => {
          item.id = index; // 1からの連番を振る
        });
      },
      sendAnswerlist: function(e, key2){
        this.contents[key2].answer.push(e);
      },
      sendDeletelist: function(key2, i){
        this.contents[key2].answer.splice( i, 1 );
      },
      sendDeleteContent: function(key2){
        this.contents.splice( key2, 1 );
        this.numberLing(); // IDを再計算
      },
      sendCompQuestion: function(e, key2){
        this.contents[key2].question = e;
      },
      sendCompMicrocopy1: function(e, key2){
        this.contents[key2].microcopy = e;
      },
      sendCompRequired: function(e, key2){
        this.contents[key2].required = e;
      },
      sendCompAnswer: function(e, key2, i){
        this.contents[key2].answer[i].label = e;
      },
      sendAnswerTag: function(e, key2, i){
        this.contents[key2].answer[i].tag = e;
      },
      sendColumnType: function(e, key2){
        this.contents[key2].columntype = e;
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

