<template>

<q-card-section class="row text-center">
    <q-card-section class="col text-h4 text-primary">
      {{  header || "추천 도서 리스트" }}
      <q-btn
    v-if="editing"
    @click="doEdit(false)"
    unelevated
    rounded
    icon-right="clear"
    label="Cancel"
  ></q-btn>
  <q-btn
  v-else
  @click="doEdit(true)"
  color="primary"
        unelevated
        rounded
        icon-right="send"
        label="장바구니에 담기"
  ></q-btn>
    </q-card-section>
  </q-card-section>
  <q-card-section>
  <q-list bordered>
      <q-item
        v-for="itemq in reversedItemqs"
        :key="itemq.id"
        @click="togglePurchased(itemq)"
        class="rounded-border"
        :class="{strikeout:itemq.purchased, priority:itemq.highPriority}"
        dense
        padding
        clickable
        v-ripple
      >
        <q-item-section>
          {{ itemq.label }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>

  <q-page  v-if="editing" class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newBook"
        @keyup.enter="addBook"
        class="col"
        bg-color="white"
        filled
        aria-placeholder="Add book"
        dense
      >
        <template v-slot:append>
          <q-btn @click="addBook" round dense flat icon="add"></q-btn>
        </template>
        <q-btn @click.stop="resetItem(id)" round dense flat icon="list"></q-btn>
      </q-input>
    </div>

    <!--list-->
    <q-list class="bg-white" separator bordered>
      <q-item
        v-for="item in books"
        :key="item.title"
        @click="item.done = item.done == 'Y' ? 'N' : 'Y'"
        :class="{ 'done bg-blue-1': item.done == 'Y' }"
        v-ripple
        clickable
      >
        <q-item-section avatar>
          <q-checkbox
            v-model="item.done"
            color="primary"
            class="no-pointer-event"
            true-value="Y"
            false-value="N"
            dense
          ></q-checkbox>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="item.done=='Y'" side>
          <q-btn
            flat
            round
            dense
            color="primary"
            icon="edit"
            @click.stop="openDialog(item)"
          >
          </q-btn>
        </q-item-section>
        <q-item-section v-if="item.done=='Y'" side>
          <q-btn
            flat
            round
            dense
            color="red"
            icon="delete"
            @click.stop="removeItem(item.id)"
          ></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    <dialog-custom ref="bookdialog" :edit-book="editBook" :origin="origin" @onInput="editTest">
    </dialog-custom>
  </q-page>
</template>

<script>
import useTestStore from "src/stores/test";
import { mapActions, mapState } from "pinia";
import BookDialogCustom from "components/BookDialogCustom.vue";

export default {
  name: "Book List",
  title: "추천 도서",
  components:{BookDialogCustom},
  data() {
    return {
      newBook: "",
      editBook:null,
      origin:null,
      itemqs : [
        { id: 1, label: "세이노의 가르침", purchased: false, highPriority: false },
        { id: 2, label: "데미안", purchased: false, highPriority: false },
        { id: 3, label: "노인과 바다", purchased: false, highPriority: false },
        { id: 4, label: "불편한 편의점", purchased: false, highPriority: false },
        { id: 5, label: "달러구트 꿈 백화점2", purchased: false, highPriority: false },
      ],
      editing:false,
      newItemq:"",
      newItemqHightPriority:false,
    };
  },
  mounted() {
    this.listTest();
  },
  computed: {
    reversedItemqs(){
      return [...this.itemqs].reverse();
    },
    ...mapState(useTestStore, ["books"]),
  },
  methods: {
    ...mapActions(useTestStore, ["insertTest","listTest","removeTest","editTest"]),
    async addBook() {
      if(this.newBook){
        //store action 저장
        this.insertTest(this.newBook);
        await this.$q.notify({
            message: `장바구니에 ${this.newBook}를(을) 추가하셨습니다`,
            icon:"home",
            color: "primary",
        });
        this.newBook="";
      }else{
        await this.$q.notify({
              message: `구입하실 도서 제목을 적어주세요!!`,
              icon:"warning",
              color: "red",
          });
      }
    },
    removeItem(id){
      this.removeTest(id);
      this.newBook="";
    },
    openDialog(item) {
      this.$refs.bookdialog.bookdialog = true;
      this.editBook = item;
      this.origin = this.editBook.title;
    },
    resetItem() {
      this.resetTest();
      this.newBook="";
    },
    togglePurchased(itemq){
      itemq.purchased = !itemq.purchased;
    },
    doEdit(editing){
      this.editing = editing;
      this.newItemq = "";
      this.newItemqHightPriority = false;
    },
  },
};
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.no-books {
  opacity: 0.5;
}
.strikeout{
  text-decoration: line-through;
  color: #b8c2cc;
}
.priority{
  color: #de751f;
  font-weight: 600;
}
</style>
