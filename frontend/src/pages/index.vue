<template>
  <div>
    <VCard>
      <VContainer fluid>
        <VRow>
          <VCol>
            <!-- ปุ่มสร้างสินค้า -->
            <VBtn color="primary" variant="flat" @click="openCreateDialog">
              สร้างสินค้าใหม่
            </VBtn>
          </VCol>
        </VRow>
      </VContainer>
    </VCard>

    <!-- ตารางแสดงข้อมูลสินค้า -->
    <VCard class="mx-auto my-7">
      <VDataTable :headers="headers" :items="filteredItems" class="elevation-1">
        <template #item.price="{ item }">
          <span>{{ item.price }}</span>
        </template>

        <template #item.tools="{ item }">
          <VIcon color="warning" @click="openEditDialog(item)">tabler-edit</VIcon>
          <VIcon color="error" @click="deleteItem(item._id)">tabler-trash</VIcon>
        </template>
      </VDataTable>
    </VCard>

    <!-- Dialog สำหรับสร้าง/แก้ไขสินค้า -->
    <VDialog v-model="dialog" persistent max-width="600px">
      <VCard>

        <VCardTitle>
          <span class="headline">{{ editMode ? 'แก้ไขสินค้า' : 'สร้างสินค้าใหม่' }}</span>
        </VCardTitle>
        
        <VCardText>
          <VTextField v-model="form.name" label="ชื่อสินค้า" />
          <VTextField class="mt-4" v-model="form.price" label="ราคา" type="number" />
        </VCardText>
        
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" @click="saveItem">{{ editMode ? 'อัปเดต' : 'บันทึก' }}</VBtn>
          <VBtn color="secondary" @click="dialog = false">ยกเลิก</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      editMode: false,
      form: { name: '', price: '' },
      headers: [
        { title: 'ลำดับ', value: 'index' },
        { title: 'ชื่อสินค้า', value: 'name' },
        { title: 'ราคา', value: 'price' },
        { title: 'เครื่องมือ', value: 'tools' },
      ],
      items: []
    };
  },
  computed: {
    filteredItems() {
      return this.items.map((item, index) => ({ ...item, index: index + 1 }));
    }
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:3000/api/'); // เปลี่ยน API path
        this.items = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    openCreateDialog() {
      this.dialog = true;
      this.editMode = false;
      this.form = { name: '', price: '' }; // ตั้งค่าฟอร์มใหม่
    },
    openEditDialog(item) {
      this.dialog = true;
      this.editMode = true;
      this.form = { ...item }; // โหลดข้อมูลที่ต้องการแก้ไข
    },
    async saveItem() {
      try {
        if (this.editMode) {
          await axios.put(`http://localhost:3000/api/${this.form._id}`, this.form); // อัปเดตข้อมูลสินค้า
        } else {
          await axios.post('http://localhost:3000/api/', this.form); // สร้างสินค้าใหม่
        }
        this.dialog = false;
        this.fetchItems();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`http://localhost:3000/api/${id}`); // ลบสินค้า
        this.fetchItems();
      } catch (error) {
        console.error(error);
      }
    }
  },
  created() {
    this.fetchItems(); // โหลดข้อมูลสินค้าหลังจากสร้างคอมโพเนนต์
  }
};
</script>
