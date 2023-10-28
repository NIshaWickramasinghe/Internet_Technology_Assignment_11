import {customer_db} from '../Db/db.js';
import {CustomerModel} from '../model/CustomerModel.js';

const sriLankanMobileNumberRegex = /^(\+94|0)[1-9][0-9]{8}$/;

// clean inputs
const cleanInputs = () => {
    $('#customer_id').val('');
    $('#customer_first_name').val('');
    $('#customer_last_name').val('');
    $('#customer_mobile').val('');
};

// load customers
const loadCustomers = () => {

    $('#customer-tbl-body').empty();

    customer_db.map((item, index) => {
        let tbl_row = `<tr><td class="customer_id">${item.customer_id}</td><td class="customer_first_name">${item.customer_first_name}</td><td class="customer_last_name">${item.customer_last_name}</td><td class="customer_mobile">${item.customer_mobile}</td></tr>`;
        $('#customer-tbl-body').append(tbl_row);
    });

};

// Add customer
$('#customer-btns>button').eq(0).on('click', () => {

    let customer_id = $('#customer_id').val();
    let customer_first_name = $('#customer_first_name').val();
    let customer_last_name = $('#customer_last_name').val();
    let customer_mobile = $('#customer_mobile').val();


    if(customer_id) {

        if(customer_first_name) {

            if(customer_last_name) {

                let isValid = sriLankanMobileNumberRegex.test(customer_mobile);
                if(customer_mobile && isValid) {

                    let customer = new CustomerModel(customer_id, customer_first_name, customer_last_name, customer_mobile);
                    customer_db.push(customer);

                    Swal.fire(
                        'Success!',
                        'Customer has been saved successfully!',
                        'success'
                    );

                    cleanInputs();
                    loadCustomers(); // call load customer function

                } else {
                    toastr.error('Invalid Customer Mobile Number');
                }

            } else {
                toastr.error('Invalid Customer Last Name');
            }

        } else {
            toastr.error('Invalid Customer First Name');
        }

    } else {
        toastr.error('Invalid Customer Id');
    }

});


//fill customer
$('#customer-tbl-body').on('click', 'tr' , function() {
    let index = $(this).index();

    let customer_id = $(this).find('.customer_id').text();
    let customer_first_name = $(this).find('.customer_first_name').text();
    let customer_last_name = $(this).find('.customer_last_name').text();
    let customer_mobile = $(this).find('.customer_mobile').text();

    $('#customer_id').val(customer_id);
    $('#customer_first_name').val(customer_first_name);
    $('#customer_last_name').val(customer_last_name);
    $('#customer_mobile').val(customer_mobile);

    console.log("customer_id: ", customer_id);
});

//search
$("#customer_search").on('input', ()=>{
    let search_term = $('#customer_search').val();
    console.log(search_term);
    let results = customer_db.filter((item) => item.customer_first_name.startsWith(search_term.toLowerCase()) || item.customer_last_name.startsWith(search_term.toLowerCase()) || item.customer_mobile.startsWith(search_term));
    console.log(results);

    $('#customer-tbl-body').empty();

    results.map((item, index) => {
        let tbl_row = `<tr><td class="customer_id">${item.customer_id}</td><td class="customer_first_name">${item.customer_first_name}</td><td class="customer_last_name">${item.customer_last_name}</td><td class="customer_mobile">${item.customer_mobile}</td></tr>`;
        $('#customer-tbl-body').append(tbl_row);
    });

})