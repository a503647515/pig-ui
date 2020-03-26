<template>
    <div>
      <p>id：{{$route.params.cid}}</p>
      <p>姓名：{{$route.query.name}}</p>
      <p>银行：{{$route.query.bankname}}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
