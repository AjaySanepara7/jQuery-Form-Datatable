$(document).ready(function(){
    
    
    let table = $("#data").DataTable({
        "fnRowCallback" : function(nRow, aData, iDisplayIndex){
        $("td:first", nRow).html(iDisplayIndex +1);
        return nRow;
    }
    });

    $('#update').hide();


    $('#save').click(function(e){

        e.preventDefault();

        validation();

        if($('#form1').valid()){
            let sr_no = "";
            let email = $('#email').val();
            let firstname = $('#firstname').val();
            let lastname = $('#lastname').val();
            let gender = $('input[name="gender"]:checked').val();
            let country = $('#country').val();
            let array = [];
            $("input[name='hobby']:checked").each(function() { 
                array.push($(this).val()); 
            }); 
            let hobby = array;
            let edit = '<button type="submit" class="edit btn btn-success">Edit</button>';
            let del = '<button type="submit" class="delete btn btn-danger">Delete</button>';
    
    
        
            addrow(sr_no,email,firstname,lastname,gender,country,hobby,edit,del);
        }
        $( '#form1' ).each(function(){
            this.reset();
        });
    })
    
    $('#fill').click(function(e){
        e.preventDefault();
        
            $('#email').val("ajay@gmail.com");
            $('#firstname').val("Ajay");
            $('#lastname').val("Sanepara");
            $('#gender_male').prop("checked", true);
            $('#country').val("India");
            $('#hobby_sports').prop("checked", true);
    })


    table.on('click', '.edit', function (e) {
        let data = table.row(e.target.closest('tr')).data();
        window.rowindex = table.row(e.target.closest('tr')).index();
        
        $('#save').hide();
        $('#update').show();
        $('#fill').hide();
        $('#email').val(data[1]);
        $('#firstname').val(data[2]);
        $('#lastname').val(data[3]);

        
        if(data[4]== 'Male'){
            $('#gender_male').prop("checked", true);
        }else{
            $('#gender_female').prop("checked", true);
        }

        $('#country').val(data[5]);
        
        let check = data[6];

        $(check).each(function(index,e){
            $(`input[value=${e}]`).prop("checked", true);
        });


    });


    table.on('click', '.delete', function (e) {
        table.row(e.target.closest('tr')).remove().draw();

    });



    $('#update').click( function (e) {
        e.preventDefault();
 
        $('#save').show();
        $('#update').hide();
        $('#fill').show();

        let array = [];
            $("input[name='hobby']:checked").each(function() { 
                array.push($(this).val()); 
            }); 
        newData = [
            "",
            $('#email').val(),
            $('#firstname').val(),
            $('#lastname').val(),
            $('input[name="gender"]:checked').val(),
            $('#country').val(),
            array,
            '<button type="submit" class="edit btn btn-success">Edit</button>',
            '<button type="submit" class="delete btn btn-danger">Delete</button>'
        ]
        $( '#form1' ).each(function(){
            this.reset();
        });
        
        table.row(rowindex).data( newData ).draw();


    });


    function validation(){
        $("#form1").validate({
            rules:{
                firstname: "required",
                lastname: "required",
                email:{
                    required: true,
                    email: true
                },
                gender: "required",
                country: "required",
                hobby: "required"
    
            },
            messages: {
                firstname: "Please enter your firstname",
                lastname: "Please enter your lastname",
                email:{
                    required: "Please enter your email",
                },
                country: "Please select a country",
                gender: "Please select your gender",
                hobby: "Please select atleast one hobby"
            }
        });
    };
    
    
    function addrow(sr_no,email,firstname,lastname,gender,country,hobby,edit,del){
    
    
    
        table.row.add([
            sr_no,
            email,
            firstname,
            lastname,
            gender,
            country,
            hobby,
            edit,
            del
        ]).draw();
    };

});







