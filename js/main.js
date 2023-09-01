let Bookmark = document.getElementById('Bookmark')
let WebSit = document.getElementById('Website')



let productContainer = []

if ( JSON.parse(localStorage.getItem('stor')) == null) 
{
    productContainer = []
}
else 
{
    productContainer =  JSON.parse(localStorage.getItem('stor'))
    display(productContainer)
}


function AddProduct()
{
    product = 
    {
        Bookmark:Bookmark.value,
        WebSit:WebSit.value,
    }
    if(Bookmark.value =='' || WebSit.value == '')
    {
        alert('Enter Your Data')
    }else
    {
        productContainer.push(product)
        display(productContainer)
        localStorage.setItem('stor' ,JSON.stringify(productContainer))
        Clear()
    }
}

function display(list)
{
    let mySort = []
    for (let i = 0; i < list.length; i++) 
    {
       mySort+=` <div class="container">
           <div class="bookmark-container">
               <span class="bookmark-title">${list[i].Bookmark}</span>
               <span class="bookmark-url d-none">${list[i].WebSit}</span>
               <div class="button-group">
               <button onclick="visit(${i})" class="btn btn-outline-primary">Visit</button>
               <button onclick="UpdateProduct(${i})" class="btn btn-outline-primary">Update</button>
               <button onclick="deleteProduct(${i})" class="btn btn-outline-primary">Delete</button>
               </div>
           </div>
   </div>`
    }
    document.getElementById('Submit').innerHTML = mySort;
}

function deleteProduct(index)
{
   productContainer.splice(index, 1)
   localStorage.setItem('stor' ,JSON.stringify(productContainer))
   display(productContainer)
}


function visit(index) 
{
    window.location.assign(`${productContainer[index].WebSit}`)
}


function searchProduct(term)
{
    let search = [] ;
    for (let i = 0; i < productContainer.length; i++) 
    {
        if (productContainer[i].Bookmark.toLowerCase().includes(term.toLowerCase()))
        {
            search.push(productContainer[i])
            display(search)
        }
        else
        {
            display(search)
        }
    }

}
function UpdateProduct(index) {
    Bookmark.value = productContainer[index].Bookmark;
    WebSit.value = productContainer[index].WebSit;

    document.getElementById('Add').innerHTML = 'Update';
    document.getElementById('Add').setAttribute('onclick', `updateBookmark(${index})`);
}
function Clear() 
{
    Bookmark.value = '';
    WebSit.value = '';
}


function updateBookmark(index) {
    productContainer[index].Bookmark = Bookmark.value;
    productContainer[index].WebSit = WebSit.value;

    localStorage.setItem('stor', JSON.stringify(productContainer));
    display(productContainer);
    document.getElementById('Add').innerHTML = 'Add';
    document.getElementById('Add').setAttribute('onclick', 'AddProduct()');
}

