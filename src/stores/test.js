import { defineStore } from "pinia";
import { uid } from "quasar";
import { LocalStorage } from 'quasar'
export default defineStore("useTest", {

  state:()=>({
      books:[],
  }),

  getters : {

  },

  actions: {

    insertTest(title){
      // db에 넣기 return id

      if(this.books){
        this.books.unshift({
          id: uid(),
          title,
          done:'N'
        });
      }else{
        this.books=[];
        this.books.push({
          id: uid(),
          title,
          done:'N'
        })
      }

      LocalStorage.set("test", this.books);
    },
    listTest(){
      this.books = LocalStorage.getItem("test");
    },
    removeTest(id){

      //this.books에서 id find해서 가져오기
      // 배열 안 오브젝트일때 idx
      const idx = this.books.findIndex(book=>book.id == id);
      //삭제 array.splice(시작 index, 제거 index, 추가 요소)
      this.books.splice(idx,1);
      LocalStorage.set("test", this.books);
    },

    resetTest() {
      const list = this.books.length;
      this.books.splice(0, list);
      LocalStorage.clear();
    },

    editTest(item){
      //배열에서 수정하되 done은 'n'으로
      const idx = this.books.findIndex(book=>book == item);
      item.done = 'N';
      this.books.splice(idx,1,item);
      LocalStorage.set("test", this.books);
    }
  }
})
