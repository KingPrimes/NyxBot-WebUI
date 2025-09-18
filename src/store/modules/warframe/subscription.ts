import { defineStore } from 'pinia';
import {
  fetchGetSubscribeEnums,
  fetchGetSubscribeTypeEnums,
  fetchPostMissionSubscribeUserList,
  fetchPostMissionSubscribeUserTypeList
} from '@/service/api/local-data';

/** 订阅状态管理接口定义 */
interface SubscriptionState {
  // 用户模态框可见性状态
  userModalVisible: boolean;
  // 类型模态框可见性状态
  typeModalVisible: boolean;
  // 当前操作的模态框类型
  currentType: 'user' | 'type' | null;
  // 当前操作类型
  operateType: 'add' | 'edit' | 'push' | 'detail';
  // 选中的行数据
  selectedRow: { id: number } | null;
  // 数据列表
  data: any[];
  // 加载状态
  loading: boolean;
  // 分页信息
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    itemCount?: number;
    pageSizes: number[];
  };
}

/** Warframe订阅管理存储模块 负责处理Warframe游戏相关的订阅数据管理，包括用户订阅和类型订阅的CRUD操作 */
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
    /** 获取当前选中行的ID */
    currentId: state => state.selectedRow?.id || null
  },
  actions: {
    /**
     * 打开模态框
     *
     * @param type 模态框类型 ('user' | 'type')
     * @param operateType 操作类型 ('add' | 'edit' | 'push' | 'detail')
     * @param rowData 行数据（可选）
     */
    async openModal(type: 'user' | 'type', operateType: 'add' | 'edit' | 'push' | 'detail', rowData?: { id: number }) {
      this.currentType = type;
      this.operateType = operateType;
      this.selectedRow = rowData || null;
      if (type === 'user') {
        this.userModalVisible = true;
      } else {
        this.typeModalVisible = true;
      }
      // 根据模态框类型和行ID加载对应数据
      if (type === 'user' && rowData?.id) {
        await this.loadUserData(rowData.id);
      }
      if (type === 'type' && rowData?.id) {
        await this.loadTypeData(rowData.id);
      }
    },

    /**
     * 加载用户数据
     *
     * @param id 用户ID
     */
    async loadUserData(id: number) {
      try {
        this.loading = true;
        const response = await fetchPostMissionSubscribeUserList({
          current: this.pagination.page,
          size: this.pagination.pageSize,
          id
        });

        // 更新分页信息
        this.pagination = {
          ...this.pagination,
          page: response.data?.current || 1,
          total: response.data?.total || 0,
          itemCount: response.data?.total
        };

        // 更新数据列表
        this.data = response.data?.records || [];
      } finally {
        this.loading = false;
      }
    },

    /**
     * 处理分页变化
     *
     * @param page 当前页码
     * @param pageSize 每页条数
     */
    async handlePaginationChange(page: number, pageSize: number) {
      // 避免重复加载
      if (this.pagination.page === page && this.pagination.pageSize === pageSize) return;
      this.pagination.page = page;
      this.pagination.pageSize = pageSize;

      // 根据当前模态框类型重新加载数据
      if (this.currentType === 'user' && this.selectedRow?.id) {
        await this.loadUserData(this.selectedRow.id);
      } else if (this.currentType === 'type' && this.selectedRow?.id) {
        await this.loadTypeData(this.selectedRow.id);
      }
    },

    /**
     * 处理每页条数变化
     *
     * @param page 当前页码
     * @param pageSize 每页条数
     */
    async handlePageSizeChange(page: number, pageSize: number) {
      this.pagination.pageSize = pageSize;
      this.pagination.page = page;
      await this.handlePaginationChange(page, pageSize);
    },

    /**
     * 加载类型数据
     *
     * @param id 类型ID
     */
    async loadTypeData(id: number) {
      try {
        this.loading = true;
        const response = await fetchPostMissionSubscribeUserTypeList({
          current: this.pagination.page,
          size: this.pagination.pageSize,
          id
        });
        // 更新分页信息
        this.pagination = {
          ...this.pagination,
          page: response.data?.current || 1,
          total: response.data?.total || 0,
          itemCount: response.data?.total
        };
        // 获取枚举数据用于数据转换
        const e = await fetchGetSubscribeEnums();
        const t = await fetchGetSubscribeTypeEnums();
        // 更新数据列表
        this.data = response.data?.records || [];

        // 转换subscribe字段的枚举值为中文显示
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

        // 转换missionTypeEnum字段的枚举值为中文显示
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

    /** 关闭模态框并重置相关状态 */
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
