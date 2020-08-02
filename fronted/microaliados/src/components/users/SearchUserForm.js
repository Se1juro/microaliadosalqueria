import React, {Component} from 'react';
class SearchUserForm extends Component {

  state={
    codigo:''
  }
  onChangeForm=async(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
    if(e.target.value===""){
      this.props.getUserByCode();
    }
  }
  searchUser=async(e)=>{
    e.preventDefault()
    this.props.getUserByCode(this.state.codigo);
  }
  cleanData=(e)=>{
    e.preventDefault();
    this.setState({codigo:''});
    this.props.getUserByCode();
  }

  render() {
    return (
        <div className={"col-md-12"}>
          <form onSubmit={this.searchUser}>
            <div className="form-group row">
              <label htmlFor="codigo" className="col-sm-2 col-form-label">Codigo</label>
              <div className="col-md-4">
                <input type="text" className="form-control" id="codigo" name={"codigo"} onChange={this.onChangeForm} value={this.state.codigo}/>
              </div>
              <button type="submit" className="btn btn-primary mb-2">Buscar</button>
              <button className="btn btn-primary mb-2" style={{marginLeft:"10px"}} onClick={this.cleanData}>Limpiar</button>
            </div>
          </form>
        </div>
    );
  }
}

export default SearchUserForm;