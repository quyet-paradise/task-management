<template>
  <v-data-table
    :headers="headers"
    :items="staffs"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Staff List</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
            <v-icon>mdi-plus-circle</v-icon>
              New staff
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.username"
                      label="Username"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.nickname"
                      label="Nickname"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                    v-model="editedItem.position"
                      :items="itemPosition"
                      label="Position"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initData"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, reactive, ref, watch, nextTick, useStore, useRouter } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'Staff',

  setup() {
    const store = useStore()
    const router = useRouter()

    const dialog = ref(false)
    const dialogDelete = ref(false)
    const headers = computed(() => {
      return [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Username',
          value: 'username'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Nickname',
          value: 'nickname'
        },
        {
          text: 'Position',
          value: 'position'
        },
        {
          text: 'Actions', 
          value: 'actions',
          sortable: false
        }
      ]
    })
    let staffs = ref<any[]>([])

    const editedIndex = ref(-1)
    let editedItem = ref({
      username: '',
      name: '',
      nickname: '',
      position: ''
    })
    const defaultItem = reactive({
      username: '',
      name: '',
      nickname: '',
      position: ''
    })

    const itemPosition = computed(() => {
      return [
        {
          text: "Developer",
          value: 'developer'
        },
        {
          text: "IT Director",
          value: 'itd'
        },
        {
          text: "Human Resource",
          value: 'hr'
        }
      ]
    })

    const formTitle = computed(() => {
      return editedIndex.value === -1 ? 'New Item' : 'Edit Item'
    })

    const editItem = (item: any) => {
      editedIndex.value = staffs.value.indexOf(item)
      editedItem.value = Object.assign({}, item)
      dialog.value = true
    }

    const deleteItem = (item: any) => {
      editedIndex.value = staffs.value.indexOf(item)
      editedItem.value = Object.assign({}, item)
      dialogDelete.value = true
    }

    const deleteItemConfirm = async () => {
      await store.dispatch('staff/deleteStaff', editedItem.value)
      staffs.value.splice(editedIndex.value, 1)
      closeDelete()
    }

    const close = () => {
      dialog.value = false
      nextTick(() => {
        editedItem.value = Object.assign({}, defaultItem)
        editedIndex.value = -1
      })
    }

    const closeDelete = () => {
      dialogDelete.value = false
      nextTick(() => {
        editedItem.value = Object.assign({}, defaultItem)
        editedIndex.value = -1
      })
    }

    const save = async () => {
      if(editedIndex.value > -1) {
        await store.dispatch('staff/editStaff', editedItem.value)
        Object.assign(staffs.value[editedIndex.value], editedItem.value)
      } else {
        await store.dispatch('staff/addStaff', editedItem.value)
        staffs.value.push(editedItem.value)
      }
      close()
      router.go(0)
    }


    const initData = async () => {
      await store.dispatch('staff/getStaffsList')
      staffs.value = store.getters['staff/all']
    }

    onBeforeMount(() => {
      initData()
    })

    watch(dialog, (val) => {
      val || close()
    })

    watch(dialogDelete, (val) => {
      val || closeDelete()
    })

    return {
      dialog,
      dialogDelete,
      headers,
      itemPosition,
      staffs,
      editedIndex,
      editedItem,
      defaultItem,
      formTitle,
      close,
      closeDelete,
      initData,
      editItem,
      deleteItem,
      deleteItemConfirm,
      save
    }
  }
})
</script>

<style>

</style>