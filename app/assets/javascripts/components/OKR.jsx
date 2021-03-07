import React from 'react';
import {connect}  from 'react-redux';
import Loader from "./Loader";
import TreeView from '@material-ui/lab/TreeView';
import StyledTreeItem from '../container/StyledTreeOKR';
import MinusSquare from '../container/MinusOKR';
import PlusSquare from '../container/PlusOKR';
import CloseSquare from '../container/NOKeyResult';



class OKRTreeView extends React.Component {
    constructor(props){
        super(props);
        this.filterByCategories = this.filterByCategories.bind(this);
        this.renderChildern = this.renderChildern.bind(this);
        this.state = {
            filterKey : ""
        }
    }

    filterByCategories(ev){
        var selectElement = ev.target;
        var value = selectElement.value;
        this.setState({
            filterKey: value == "--select catgegory for filter --" ? "" :  value
        });
    }

    buildOKRAndRender(){
        let {OKRTree, categories} = this.buildOKR();
        let {filterKey}  = this.state;

        let list =  Object.keys(OKRTree).filter(key => {
            return filterKey.length >= 1 ? OKRTree[key].category.indexOf(filterKey) != -1 : true;
        }).map((key) => {
            return (<StyledTreeItem key={OKRTree[key].id} nodeId={OKRTree[key].id} label={OKRTree[key].title} >
                {this.renderChildern(OKRTree[key])}
            </StyledTreeItem>)
        });

        categories.push("--select catgegory for filter --")

        return (
            <React.Fragment>
                <div>
                    <React.Fragment>
                        <select onChange={this.filterByCategories}>
                        {
                            React.Children.toArray(
                                categories.map(category => {
                                    if(filterKey == "" &&  category == "--select catgegory for filter --"){
                                       return <option value={""} selected>{category}</option>
                                    }else if(filterKey != "" && filterKey == category){
                                        return <option value={category} selected>{category}</option>
                                    }else{
                                        return <option value={category}>{category}</option>
                                    }
                                })
                            )
                        }
                        </select>
                    </React.Fragment>
                    <React.Fragment>
                            <TreeView className="root" defaultExpanded={['1']} defaultCollapseIcon={<MinusSquare />} defaultExpandIcon={<PlusSquare />} defaultEndIcon={<CloseSquare />}>
                                {list}
                            </TreeView>
                    </React.Fragment>
                </div>
            </React.Fragment>
        );
    }

    renderChildern(OKR){
        if(!OKR.key_results){
            return null;
        }
        if(OKR.key_results.length == 0){
            return null;
        }
        let result =  OKR.key_results.map((keyResult) => {
            return (<StyledTreeItem key={keyResult.id} nodeId={keyResult.id} label={keyResult.title} >
                    {this.renderChildern(keyResult)}
            </StyledTreeItem>)
        });

        return result;
    }



    buildOKR(){
        let {OKR} = this.props;
        let Objective_Parent_ID = [];
        let OKRTree = {};
        let OrphanKeyResults = {}
        let categories = [];
        OKR.forEach(function(okr){
            if(okr.parent_objective_id == ""){
                Objective_Parent_ID.push(okr.id);
                if(categories.indexOf(okr.category) == -1){
                    categories.push(okr.category)
                }
                OKRTree[okr.id] = {
                    ... okr,
                    key_results: []
                }
                if(OrphanKeyResults[okr.id]){
                    OKRTree[okr.id].key_results = OrphanKeyResults[okr.id];
                    delete OrphanKeyResults[okr.id];
                }
            }else{
                if(Objective_Parent_ID.indexOf(okr.parent_objective_id) != -1){
                    OKRTree[okr.parent_objective_id].key_results.push(okr);
                }else{
                    if(!OrphanKeyResults[okr.parent_objective_id]){
                        OrphanKeyResults[okr.parent_objective_id] = []; 
                    }
                    OrphanKeyResults[okr.parent_objective_id].push(okr)
                }
            }
        }, this);
        return {OKRTree, categories};
    }

    render(){
        return (
            <React.Fragment>
            <div>
                {this.props.isLoading ? <Loader /> : (
                    (<React.Fragment>
                        {this.buildOKRAndRender()}
                    </React.Fragment>
                    )
                )}
            </div>
        </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        OKR: state.OKR,
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps)(OKRTreeView);
