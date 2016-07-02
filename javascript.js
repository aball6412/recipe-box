import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      recipe: ""
    } //End state
    
  } //End constructor
  
  
  
  render() {
    
    return (
      
      <div className="row">
        
        
          <div className="col-md-5 add_recipe">
              <div className="form-group">
                <input type="text" className="form-control rec_title" placeholder="Recipe Title" />
                <input type="text" className="form-control rec_ingredient" placeholder="Ingredient" />
                <button type="button" className="btn btn-primary">Add Ingredient</button>
                <button onClick={ 
                    (event) => {
                      var title = $(".rec_title").val();
                      var ingredients = $(".rec_ingredient").val();
                      this.get_new_recipe(title, ingredients);
                    }// End handler
                  } 
                  
                  type="button" className="btn btn-success">Submit</button>
              </div>
          </div>
        
        
          <div className="col-md-6 recipes">
            <Recipe_list />
          </div>
        
        
       </div>
      
      );
    
  } //End render
  
  get_new_recipe(title, ingredients) {

    console.log(title);
    console.log(ingredients);
    
    this.setState({ recipe: "new one" });
    console.log("make a new recipe");
  }
  
  
  
}; //End app component




class Recipe_list extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
        Omelet: ["Bacon", "Eggs", "Cheese", "Vegetables"],
        Spaghetti: ["Noodles", "Meat Sauce", "Cheese"]
    } //End state
    

  } //End constructor
  
  get_recipes(state) {
    var recipes = Object.keys(state);
    return recipes;
    
  }
  
  
  render() {
    
    var recipes = this.get_recipes(this.state);
    var recipe_list = [];
    
    for (var i in recipes) {
      recipe_list.push(<Recipe_list_item recipes={ recipes[i] } />);
    }
    
    return (
  
      <div>{ recipe_list }</div>
  
    );
    
    
  } //End render

} //End recipe_list component


var Recipe_list_item = function(props) {
  
  var recipe = props.recipes;
  
  
  return (
  
    <div className="recipe_item"><h3 className="text-center">{ recipe }</h3>
    
    </div>
    
  );
  
  
}




ReactDOM.render(<App />, document.querySelector(".app"));

