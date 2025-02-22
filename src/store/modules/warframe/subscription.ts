import { defineStore } from 'pinia';
import {
  fetchGetSubscribeEnums,
  fetchGetSubscribeTypeEnums,
  fetchPostMissionSubscribeUserList,
  fetchPostMissionSubscribeUserTypeList
} from '@/service/api/local-data';

interface SubscriptionState {
  userModalVisible: boolean;
  typeModalVisible: boolean;
  currentType: 'user' | 'type' | null;
  operateType: 'add' | 'edit' | 'push' | 'detail';
  selectedRow: { id: number } | null;
  data: any[];
  loading: boolean;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    itemCount?: number;
    pageSizes: number[];
  };
}

export const useSubscriptionStore = defineStore('subscription', {
  state: (): SubscriptionState => ({
    userModalVisible: false,
    typeModalVisible: false,
    currentType: null,
    operateType: 'detail',
    selectedRow: null,
    data: [],
    loading: false,
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
      itemCount: 0,
      pageSizes: [10, 15, 20]
    }
  }),
  getters: {
    currentId: state => state.selectedRow?.id || null
  },
  actions: {
    async openModal(type: 'user' | 'type', operateType: 'add' | 'edit' | 'push' | 'detail', rowData?: { id: number }) {
      this.currentType = type;
      this.operateType = operateType;
      this.selectedRow = rowData || null;
      if (type === 'user') {
        this.userModalVisible = true;
      } else {
        this.typeModalVisible = true;
      }
      if (type === 'user' && rowData?.id) {
        await this.loadUserData(rowData.id);
      }
      if (type === 'type' && rowData?.id) {
        await this.loadTypeData(rowData.id);
      }
    },
    async loadUserData(id: number) {
      try {
        this.loading = true;
        const response = await fetchPostMissionSubscribeUserList({
          current: this.pagination.page,
          size: this.pagination.pageSize,
          id
        });

        this.pagination = {
          ...this.pagination,
          page: response.data?.current || 1,
          total: response.data?.total || 0,
          itemCount: response.data?.total
        };

        this.data = response.data?.records || [];
      } finally {
        this.loading = false;
      }
    },
    async handlePaginationChange(page: number, pageSize: number) {
      if (this.pagination.page === page && this.pagination.pageSize === pageSize) return;
      this.pagination.page = page;
      this.pagination.pageSize = pageSize;

      if (this.currentType === 'user' && this.selectedRow?.id) {
        await this.loadUserData(this.selectedRow.id);
      } else if (this.currentType === 'type' && this.selectedRow?.id) {
        await this.loadTypeData(this.selectedRow.id);
      }
    },

    async handlePageSizeChange(page: number, pageSize: number) {
      this.pagination.pageSize = pageSize;
      this.pagination.page = page;
      await this.handlePaginationChange(page, pageSize);
    },
    async loadTypeData(id: number) {
      try {
        this.loading = true;
        const response = await fetchPostMissionSubscribeUserTypeList({
          current: this.pagination.page,
          size: this.pagination.pageSize,
          id
        });
        this.pagination = {
          ...this.pagination,
          page: response.data?.current || 1,
          total: response.data?.total || 0,
          itemCount: response.data?.total
        };
        const e = await fetchGetSubscribeEnums();
        const t = await fetchGetSubscribeTypeEnums();
        this.data = response.data?.records || [];
        if (e.data) {
          const enums = e.data;
          this.data.forEach(d => {
            if (!d.subscribe || typeof d.subscribe !== 'string') return;
            const subscribeKey = d.subscribe.trim().toUpperCase();
            const enumValue = enums[subscribeKey as keyof typeof enums];
            if (enumValue) {
              d.subscribe = subscribeKey === 'ERROR' ? '不限' : enumValue;
            }
          });
        }
        if (t.data) {
          const typeEnums = t.data;
          this.data.forEach(d => {
            if (!d.missionTypeEnum || typeof d.missionTypeEnum !== 'string') return;
            const typeKey = d.missionTypeEnum.trim().toUpperCase();
            const typeValue = typeEnums[typeKey as keyof typeof typeEnums];
            if (typeValue) {
              d.missionTypeEnum = typeKey === 'ERROR' ? '不限' : typeValue;
            }
          });
        }
      } finally {
        this.loading = false;
      }
    },
    closeModal() {
      if (this.currentType === 'user') {
        this.userModalVisible = false;
      } else {
        this.typeModalVisible = false;
      }
      this.currentType = null;
      this.selectedRow = null;
      this.data = [];
    }
  }
});
