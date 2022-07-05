<template>
  <v-data-table
    :headers="headers"
    :items="staffs"
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
              @click="addItem"
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
                      v-model="body.username"
                      label="Username"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="body.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="body.nickname"
                      label="Nickname"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="body.position"
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
import { 
  computed, 
  defineComponent, 
  onBeforeMount, 
  reactive, 
  ref, 
  watch, 
  nextTick, 
  useStore, 
  useRouter 
} from '@nuxtjs/composition-api';

import { Staff, DropdownType, UpdateStaffBody } from '~/type/staff.type'

export default defineComponent({
  name: 'Staff',

  setup() {
    const store = useStore()
    const router = useRouter()

    const dialog = ref<boolean>(false)
    const dialogDelete = ref<boolean>(false)
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
    let staffs = ref<Staff[]>([])
    const formTitle = ref<string>('New Item')

    const initialData: Staff = {
      username: '',
      name: '',
      nickname: '',
      position: '',
      id: ''
    }

    const body = ref<Staff>({...initialData})

    const itemPosition: DropdownType[] = [
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

    const editItem = (item: Staff) => {
      formTitle.value = 'Edit Item'
      dialog.value = true
      body.value = {...item}
    }

    const addItem = () => {
      formTitle.value = 'New Item'
    }

    const deleteItem = (item: Staff) => {
      dialogDelete.value = true
      body.value = item
    }

    const deleteItemConfirm = async () => {
      await store.dispatch('staff/deleteStaff', body.value.id)
      closeDelete()
    }

    const close = () => {
      dialog.value = false
      body.value = initialData
    }

    const closeDelete = () => {
      dialogDelete.value = false
      body.value = initialData
    }

    const save = async () => {
      if (formTitle.value === 'New Item') {
        await store.dispatch('staff/addStaff', body.value)
      } else {
        await store.dispatch('staff/editStaff',
          {
            body: body.value,
            id: body.value.id
          }
        )
        router.go(0)
      }
      close()
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
      formTitle,
      body,
      close,
      closeDelete,
      initData,
      editItem,
      addItem,
      deleteItem,
      deleteItemConfirm,
      save
    }
  }
})
</script>

<style>

</style>