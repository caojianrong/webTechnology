<template>
  <div class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes.sync="pageSizes"
       style="text-align: center;margin:20px 0;"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 5
    },
    pageSizes: {
      type: Array,
      default() {
        return [5,10,20,30]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentPage: {
      set(val) {
        this.$emit('update:page', val);
      },
      get() {
        return this.page;
      }
    },
    pageSize: {
       set(val) {
        this.$emit('update:limit', val);
      },
      get() {
        return this.limit;
      }
     
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(val,"条数")
            this.currentPage =
        this.currentPage - this.pageGroup > 0
          ? this.currentPage - this.pageGroup
          : 1;
      this.$emit('pagination', { page: this.currentPage, limit: val });
    },
    handleCurrentChange(val) {
      //  console.log(val,"页数")
      this.$emit('pagination', { page: val, limit: this.pageSize });
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
</style>