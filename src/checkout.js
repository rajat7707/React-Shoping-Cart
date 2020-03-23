import React from 'react';
import { MDBDataTable} from 'mdbreact';

/** Note :-
 *  npm install --save mdbreact :- Please First Install mdreact 
 *  https://mdbootstrap.com/docs/react/tables/datatables/ To Acess All Functinality Of mdbreact
 */

const DatatablePage = (props) => {
        let pro = '';
        let checkoutPrice = 0 ;
        let finalCheckOut = [];
        props.checkOutData.filter( (val, index) => {
            for(let i = 0 ; i < val.initialQuantity ; i++){
                pro += val.item ;
            }
            checkoutPrice += val.totalPrice ;
            finalCheckOut.push({item: pro, totalPrice : "$"+checkoutPrice});
        });

        const columns = [
            { label: <span>INPUT &#x021F5;</span>, field: 'item', sort: 'asc', width: 270, attributes: {className :"fas fa-sort"} },
            { label: <span>OUTPUT &#x021F5;</span>, field: 'totalPrice', sort: 'asc', width: 270 }
        ];
        const rows = [finalCheckOut[finalCheckOut.length - 1]];
        let data = { columns, rows };

    return (
            <MDBDataTable
                striped
                bordered
                hover
                btn
                data={data}
                noBottomColumns
                exportToCSV
                filter="items"
                theadColor="blue"
                noRecordsFoundLabel="No Record Found"
            />
    );
}

export default DatatablePage;