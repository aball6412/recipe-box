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
            <Recipe_list recipes={ this.state.recipes }
                onEdit={ (id) => {
                            console.log("I'm going to edit this");
                            console.log("edit id: " + id);
                         } //End anon function
                }  
                
                onDelete={ (id) => {
                            
                            //Create copy of current state
                            var newstate = this.state.recipes;
                            //Remove the element that the user selected from that copy
                            newstate.splice(id, 1);
                            
                            //Set the new array to the recipes key
                            this.setState({ recipes: newstate });
                            } //End anon function
                    
                } />
          </div>
        
        
       </div>
      
      );
    
  
  } //End render
  

  
  
}; //End app component




var Recipe_list = function(props) {
 
    var recipes = props.recipes;
    var recipe_list = [];
    var edit_function = props.onEdit;
    var delete_function = props.onDelete;
    

    
    for (var i in recipes) {
        
        recipe_list.push(<Recipe_list_item key={i} counter={i} recipe={ recipes[i] } onEdit={ edit_function } onDelete={ delete_function } />);
    }
    
    return (
        <div className="panel-group" id="accordian" role="tablist" aria-multiselectable="true">
            { recipe_list }
        </div>
    );

    

} //End recipe_list component


    
    
var Recipe_list_item = function(props) {
  
  var title = props.recipe.title
  var ingredients = props.recipe.ingredients;
  var id = props.counter;
  var heading_id = "heading" + id;
  var class_id = "collapse" + id;
  var class_id_href = "#" + class_id;
  var edit_function = props.onEdit;
  var delete_function = props.onDelete;
    
  return (
    <div className="panel panel-default">
        <div className="panel-heading" role="tab" id={ heading_id }>
              <h3 className="panel-title">
                    <a role="button" data-toggle="collapse" data-parent="#accordian" href={ class_id_href } aria-expanded="false" aria-controls={ class_id }>
                        { title }
                    </a>
              </h3> 
        </div>

        <div id={ class_id } className="panel-collapse collapse" role="tabpanel" aria-labelledby={ heading_id }>
            <div className="panel-body">
                <p>{ ingredients }</p>
                <button onClick={ () => edit_function(id) } className="btn btn-default" type="button">Edit</button>
                <button onClick={ () => delete_function(id) } className="btn btn-danger" type="button">Delete</button>
            </div>
        </div>
    </div>

  );
  
  
} //End recipe list item component





ReactDOM.render(<App />, document.querySelector(".app"));

