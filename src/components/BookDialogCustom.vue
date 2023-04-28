<template>
  <q-dialog v-model="bookdialog">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">내용 수정</div>
        <div class="text-subtitle2"> {{editBook.id}} </div>
      </q-card-section>
      <q-card-section>
        <q-input
        v-model="editBook.title"
        @keyup.enter="onOKClick"
        ></q-input>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn
          color="primary"
          unelevated
          dense
          label="OK"
          @click="onOKClick"
        />
        <q-btn
          unelevated
          dense
          color="primary"
          label="Cancel"
          @click="onCancelClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  name: "DialogCustom",
  props: ['editBook','origin'],
  emits: ['onInput'],
  data() {
    return {
      bookdialog: false,
    };
  },
  mounted(){
  },
  watch:{
  },
  methods: {
    onOKClick() {
      this.$emit('onInput',this.editBook);
      this.bookdialog = false;
    },
    onCancelClick() {
      this.editBook.title =this.origin,
      this.bookdialog = false;
    },
  },
};
</script>

<style></style>
