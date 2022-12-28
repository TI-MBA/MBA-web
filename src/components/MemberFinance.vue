<template>        
    <div class="content">        
        <table class="table is-borderless is-striped center mt-4">
            <thead>
                <tr>
                    <th>Data referência</th>
                    <th>valor</th>
                    <th>observações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="payment in paymentList" :key="payment.id">
                    <td class="is-vcentered">{{ paymentDateText(payment.date) }}</td>
                    <td class="is-vcentered">{{ "R$ " + (payment.paymentValue).toFixed(2) }}</td>
                    <td class="is-vcentered width-limit"> {{ payment.observation }} </td>
                </tr>
            </tbody>
        </table>
        <br/>
        <progress class="progress is-small is-info" max="100" v-bind:class="progressVisibility">50%</progress>
    </div>
 </template>
 
 <script>
 import axios from 'axios'
 
 export default {
    components: {
    },
    created () {
        if (this.userId) {
            this.progressVisibility = ''
            this.fetchPayments()
        }
    },
    data() {
        return {
            userId: localStorage.getItem('userid'),
            isAdmin: false,
            showDialog: false,
            selectedPayment: {},
            paymentList: [],
            progressVisibility: 'is-hidden'
        }
    },    
    computed: {},
    methods: {        
        fetchPayments() {            
            axios.get('https://mba-api.herokuapp.com/api/payment/user/' + this.userId)
            .then((response) => {
                this.paymentList = this.order(response.data)
                this.progressVisibility = 'is-hidden'
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.status);
                    this.progressVisibility = 'is-hidden'
                }
            });
        },
        order(paymentList) {
            return paymentList.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
            });
        },
        presenceDateText(dateString) {
            const rehearsalDate = new Date(dateString);
            return rehearsalDate.getDate() + "/" + (rehearsalDate.getUTCMonth() + 1) + "/" + rehearsalDate.getUTCFullYear()
        },
        paymentDateText(dateString) {
            const paymentDate = new Date(dateString);
            return (paymentDate.getUTCMonth() + 1) + "/" + (paymentDate.getUTCFullYear())
        }
    }
 }
 </script>
 
 <style>
 .container{
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
     grid-gap: 1.5em;
     margin-top: 1.5em;
 }
 </style>