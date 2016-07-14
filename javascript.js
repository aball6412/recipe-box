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
                 ],
        edit: false,
        id: false,
        ingred_count: 1,
        edit_ingred_count: 0
        
        
    } //End state
    
    
  } //End constructor
  
  
  render() {
      
    return (
      
      <div className="row">
        
        
          <div className="col-md-5 add_recipe">
            <Add_recipe 
                get_new_recipe={ (title, ingredient_list) => {
        
                                    var obj = {
                                        title: title,
                                        ingredients: ingredient_list
                                    };     

                                    this.setState({ recipe: this.state.recipes.push(obj) } );
        
                                } }
    
                add_ingredient={ (ingred_count) => {
                                
                                    this.setState({ ingred_count: (this.state.ingred_count + 1) });
                                
                               } }
                
                ingredient_count={ this.state.ingred_count }
                               
                               />
          </div>
        
        
          <div className="col-md-6 recipes">
            <Recipe_list recipes={ this.state.recipes }
                onEdit={ (id) => {
                
                            this.setState({ edit: true, id: id });
                

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
                    
                }
                
                editRecipe={ (full_recipe_list, new_recipe, id) => {
                            
                            full_recipe_list.splice(id, 1, new_recipe);

                            this.setState({ recipes: full_recipe_list, edit: false, id: false });
                            
                           }
                }
                           
                editIngredient={ () => {
                                
                              this.setState({ edit_ingred_count: (this.state.edit_ingred_count + 1)})  
                            
                                
                           }
                }
                
                state={ this.state } />
          </div>
        
        
       </div>
      
      );
    
  
  } //End render
  

  
  
}; //End app component











var Add_recipe = function(props) { 
    
    
    var ingredient_count = props.ingredient_count;
    var input_list = [];
    var ingredient_list = [];
    
    for (var i=1; i <= ingredient_count; i++) {
        
       input_list.push(<Ingredient_item key={ i } count={ i - 1 } />);
        
    }
                       
    
    
    return (
            <div className="form-group">
                <input type="text" className="form-control rec_title" placeholder="Recipe Title" />
                
                { input_list }
                       
                <button onClick={
        
                    (ingredient_count) => {
                        props.add_ingredient();
                    }
        
        
                } type="button" className="btn btn-primary">Add Ingredient</button>
                
                <button onClick={ 
                    () => {
                    
                    //See how many input boxes there are and loop through each box to get contents
                    
                    for (var i = 1; i <= ingredient_count; i++) {
                        var ingredients = $(".rec_ingredient" + (i - 1)).val();
                        ingredient_list.push(ingredients)
                    }
                
                      var title = $(".rec_title").val();
                    
                        console.log(ingredient_list);
                      
                      props.get_new_recipe(title, ingredient_list);
                    }// End handler
                  } 

                  type="button" className="btn btn-success submit">Submit</button>
            </div>
    );
    
} //End add recipe component









var Ingredient_item = function(props) {
    
    var count = props.count;
    var class_id = "form-control rec_ingredient" + count;
    
    return (
    
        <input type="text" className={ class_id } placeholder="Ingredient" />
    
    );
    
    
} //End ingredient item












var Recipe_list = function(props) {
 
    var recipes = props.recipes;
    var recipe_list = [];
    var edit_function = props.onEdit;
    var delete_function = props.onDelete;
    var edit_recipe = props.editRecipe;
    var edit_ingredient = props.editIngredient;
    

    
    for (var i in recipes) {
        
        recipe_list.push(<Recipe_list_item key={i} counter={i} recipe={ recipes[i] } onEdit={ edit_function } onDelete={ delete_function } state={ props.state } full_recipe_list={ recipes } editRecipe={ edit_recipe } editIngredient={ edit_ingredient } />);
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
  var full_recipe_list = props.full_recipe_list;
  var id = props.counter;
  var custom_id = "panel-body ingredients" + id;
  var heading_id = "heading" + id;
  var class_id = "collapse" + id;
  var class_id_href = "#" + class_id;
  var edit_function = props.onEdit;
  var delete_function = props.onDelete;
  var edit_recipe = props.editRecipe;
  var edit_ingredient = props.editIngredient;
    
  var individual_ingredients = [];
  

  for (var i in ingredients) {
            
            individual_ingredients.push(<Individual_ingredients key={i} ingred_count={ i } counter={ id } ingredient={ ingredients[i] } state={ props.state }/>);
        }
                                        
  for (var k=1; k<= props.state.edit_ingred_count; k++) {
                
          individual_ingredients.push(<Individual_ingredients blank={ true } state={ props.state } />); 
                
                
  } 
    
    
    //If the state of this id is edit then...
    if (props.state.id === id) {
       
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
                    <div className={ custom_id }>
                        
                        { individual_ingredients }
            
                        <button onClick={ () => {
            
            
                                edit_ingredient();
            
            
                            } }
      
                        type="button" className="btn btn-primary">Add Ingredient</button>
                        
                        
                        
                        <button onClick={ () => {
            
                                var lst = [];
                                
                                for (var j=0; j< ingredients.length; j++) {
                                    var new_ingredients = $(".rec_ingredient_edit" + j).val();
                                    lst.push(new_ingredients);
                                }
                                
            
                                var new_recipe = {
                                    title: title,
                                    ingredients: lst
                                }
            
                                edit_recipe(full_recipe_list, new_recipe, id);

                            } }
                        
                        type="button" className="btn btn-success submit">Submit</button>
            
                    </div>
                </div>
            </div>
        
        
        );
       
    }
    
    else {
        
        
        
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
                    <div className={ custom_id }>
                        { individual_ingredients }
                        <button onClick={ () => edit_function(id) } className="btn btn-default" type="button">Edit</button>
                        <button onClick={ () => delete_function(id) } className="btn btn-danger" type="button">Delete</button>
                    </div>
                </div>
            </div>


          );

    }

  
} //End recipe list item component




var Individual_ingredients = function(props) {
    
    var ingredient = props.ingredient;
    var id = props.counter;
    var additional_ingredients = props.state.edit_ingred_count;
    
    var ingred_count = props.ingred_count;
    var class_id = "form-control rec_ingredient_edit" + ingred_count;
    var class_id_blank = "form-control rec_ingredient_edit" + (ingred_count + additional_ingredients);
    
    
    if (props.blank) {
        
        return (
        
            <input type="text" className={ class_id_blank } placeholder="Ingredient" />
        )
        
        
    }
    
    
    ///IF PROPS.EDIT == TRUE IS GOOD ALSO MAKE SURE THAT IT ONLY FIRES FOR THE SELECTED ID AND NOT FOR ALL THE DIFFERENT RECIPES
    if (props.state.edit === true && props.state.id === id) {

        return (
        
            <input type="text" className={ class_id } placeholder="Ingredient" defaultValue={ ingredient } />
        
        ); 
    }
    
    
    else {
        return (

            <p>{ ingredient }</p>
        );
    }
    
    
} //End Individual_ingredients component



ReactDOM.render(<App />, document.querySelector(".app"));

