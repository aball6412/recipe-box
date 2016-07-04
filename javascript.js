import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
        recipes: [
                     { 
                         title: "Omelet",
                         ingredients: ["Bacon", "Eggs", "Cheese", "Vegetables"]
                     },
                     {
                         title: "Spaghetti",
                         ingredients: ["Noodles", "Meat Sauce", "Cheese"]
                     }
                 ]
        
    } //End state
    
  } //End constructor
  
  
    
    get_new_recipe(title, ingredients) {
        
        var obj = {
            title: title,
            ingredients: ingredients
        };     
            
        this.setState({ recipe: this.state.recipes.push(obj) } );
    }
  
  
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
                  
                  type="button" className="btn btn-success submit">Submit</button>
              </div>
          </div>
        
        
          <div className="col-md-6 recipes">
            <Recipe_list recipes={ this.state.recipes } />
          </div>
        
        
       </div>
      
      );
    
  
  } //End render
  

  
  
}; //End app component




var Recipe_list = function(props) {
 
    var recipes = props.recipes;
    var recipe_list = [];
    
    for (var i in recipes) {
        
        recipe_list.push(<Recipe_list_item key={i} recipe={ recipes[i] } />);
    }
    
    return (
        <div>{ recipe_list }</div>
    );

    

} //End recipe_list component


    
    
var Recipe_list_item = function(props) {
  
  var title = props.recipe.title
  var ingredients = props.recipe.ingredients;
    
    console.log(props.recipe.ingredients);
  
  return (
  
    <div className="recipe_item">
      <h3 className="text-center">{ title }</h3> 
    </div>
    
  );
  
  
} //End recipe list item component





ReactDOM.render(<App />, document.querySelector(".app"));

