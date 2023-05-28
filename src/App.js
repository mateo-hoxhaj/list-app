import React, {Component} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './App.css'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0,
            pageCount:0,
          
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
    receivedData() {
      const url='https://catfact.ninja/facts?page='+(this.state.currentPage+1);
        axios
            .get(url)
            .then(response => {

                const data =response.data.data;
                console.log(response.data.data);
                const postData = data.map(pd => <div  key={pd.id}>
                    <li>{pd.fact}{' '}{pd.length}</li>
                </div>)
                
                this.setState({
                    pageCount: 34 ,//response.data.links.length
                    postData
                })
            });
    }
    

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
          this.receivedData()
        });

    };

    componentDidMount() {
      this.receivedData()
    }
    render() {
        return (
            <div>
                {this.state.postData}
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={<a href="">...</a>}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  hrefBuilder={(currentPage, pageCount, selected) =>
                      currentPage >= 1 && currentPage <= pageCount ? `https://catfact.ninja/facts?page=${selected+1}` : ''
                    }
                hrefAllControls
                
                    />
                   
            </div>
            
        ) 
    }
   
}