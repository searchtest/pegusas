<template>
    <div id="dashboard">
        <div><boxCard></boxCard></div>
        <div><lineChart></lineChart></div>
        <div>
            <div style="display: inline-block;float: left;width: 50%"><resentTemplates></resentTemplates></div>
            <div style="display: inline-block;float: right;width: 50%"><resentJobs></resentJobs></div>
        </div>
    </div>
</template>

<script>
import boxCard from './boxCard'
import lineChart from './lineChart'
import resentJobs from './resentJobs'
import resentTemplates from './resentTemples'
export default {
  name: 'dashboard',
  components: {
    boxCard,
    lineChart,
    resentJobs,
    resentTemplates
  }
}
</script>

<style scoped>

</style>
