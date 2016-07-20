import React from "react";
import ReactDOM from "react-dom";



$(".show_recipe_box").click(function() {
  
  $(".add_recipe").removeClass("hidden");
  $(".show_recipe_box").addClass("hidden");
  
});


$(".app").on("click", ".add_recipe_submit", function() {
  
  $(".add_recipe").addClass("hidden");
  $(".show_recipe_box").removeClass("hidden");
});




//Create main App component
class App extends React.Component {
  
  constructor(props) {
    super(props);
      
    //Get the saved recipe from the local storage
    var saved_recipe = JSON.parse(localStorage.recipes);
    
    //Create initial state
    this.state = {
        recipes: saved_recipe,
        edit: false,
        id: false,
        ingred_count: 1,
        edit_ingred_count: 0
            
    } //End state
    
    
          //RECIPE VALUE PAIR NEEDS TO BE A LIST WITH EACH OBJECT AS A RECIPE EXAMPLE:
//        recipes: [
//                     { 
//                         title: "Omelet",
//                         ingredients: ["Bacon", "Eggs", "Cheese", "Vegetables"]
//
//                     },
//                     {
//                         title: "Spaghetti",
//                         ingredients: ["Noodles", "Meat Sauce", "Cheese"]
//                     }
//                 ]
//        
    

  } //End constructor
  
  
  //Render the App
  render() {
      

    return (
      
      <div className="row">
        
        
          <div className="col-md-4 col-md-offset-4 add_recipe hidden">

            <Add_recipe 
                get_new_recipe={ (title, ingredient_list) => {

                                    var obj = {
                                        title: title,
                                        ingredients: ingredient_list
                                    };     

                                    this.setState({ recipe: this.state.recipes.push(obj) } );
        
                                    //Save this.state.recipes to local storage
                                    localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
                                    console.log(localStorage);
        
                                } }
    
                add_ingredient={ (ingred_count) => {
                                
                                    this.setState({ ingred_count: (this.state.ingred_count + 1) });
                                
                               } }
                
                ingredient_count={ this.state.ingred_count }
                               
                               />
          </div>
        
        
          <div className="col-md-6 col-md-offset-3 recipes">
              
            <Recipe_list recipes={ this.state.recipes }
                onEdit={ (id) => {
                
                            this.setState({ edit: true, id: id, edit_ingred_count: 0 });
                

                         } //End anon function
                }  
                
                onDelete={ (id) => {
                            
                            //Create copy of current state
                            var newstate = this.state.recipes;
                            //Remove the element that the user selected from that copy
                            newstate.splice(id, 1);
                            
                            //Set the new array to the recipes key
                            this.setState({ recipes: newstate });

                            //Save this.state.recipes to local storage
                            localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
                            console.log(localStorage);

                            } //End anon function
                    
                }
                
                editRecipe={ (full_recipe_list, new_recipe, id) => {

                            full_recipe_list.splice(id, 1, new_recipe);

                            this.setState({ recipes: full_recipe_list, edit: false, id: false });
                            
                            //Save this.state.recipes to local storage
                            localStorage.setItem("recipes", JSON.stringify(this.state.recipes));
                            console.log(localStorage);
                            
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










//Create the Add Recipe component
var Add_recipe = function(props) { 
    
    //Get initial variables
    var ingredient_count = props.ingredient_count;
    var input_list = [];
    var ingredient_list = [];
    
    //Find out how many times user clicked "add ingredient" and display that many Ingredient_item components
    for (var i=1; i <= ingredient_count; i++) {
        
       input_list.push(<Ingredient_item key={ i } count={ i - 1 } />);
        
    }
                       
    
    //Return the JSX to create the Add_recipe section
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
                      
                      //Get the recipe title
                      var title = $(".rec_title").val();
                      
                      //Call function to add the new recipe information
                      props.get_new_recipe(title, ingredient_list);

                    }// End handler
                  } 

                  type="button" className="btn btn-success add_recipe_submit submit">Submit</button>
            </div>
    );
    
} //End add recipe component








//Create component to display new input box for each time user clicks "add ingredient"
var Ingredient_item = function(props) {
    
    //Get needed variables
    var count = props.count;
    var class_id = "form-control input_item rec_ingredient" + count;
    
    return (
    
        <input type="text" className={ class_id } placeholder="Ingredient" />
    
    );
    
    
} //End ingredient item











//Create recipe list component
var Recipe_list = function(props) {
 
    //Get initial variables
    var recipes = props.recipes;
    var recipe_list = [];
    var edit_function = props.onEdit;
    var delete_function = props.onDelete;
    var edit_recipe = props.editRecipe;
    var edit_ingredient = props.editIngredient;
    

    //For each recipe get Recipe_list_item component
    //Pass all needed variables and functions to Recipe_list_item component
    for (var i in recipes) {
        
        recipe_list.push(<Recipe_list_item key={i} counter={i} recipe={ recipes[i] } onEdit={ edit_function } onDelete={ delete_function } state={ props.state } full_recipe_list={ recipes } editRecipe={ edit_recipe } editIngredient={ edit_ingredient } />);
    }
    

            
    return (
        <div className="panel-group" id="accordian" role="tablist" aria-multiselectable="true">
            { recipe_list }
        </div>

    );


    

} //End recipe_list component


    
//Create Recipe_list_item component
var Recipe_list_item = function(props) {
  
  //Get ititial variables
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
    
  var ingred_count = 0;
  var individual_ingredients = [];
  

  //For each ingredient in a particular recipe call an Individual_ingredients component
  for (var i in ingredients) {
            
            individual_ingredients.push(<Individual_ingredients key={i} ingred_count={ i } counter={ id } ingredient={ ingredients[i] } state={ props.state }/>);
                                        
            ingred_count = Number(i);
        }
                                        
  for (var k=1; k<= props.state.edit_ingred_count; k++) {
                
          individual_ingredients.push(<Individual_ingredients key={"key" + k} additional_ingred={k} blank={ true } ingred_count={ ingred_count } counter={ id } state={ props.state } />); 
                
                
  } 
    
    
    //If the state of this id is edit then return...
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
                                
                                for (var j=0; j< (ingredients.length + props.state.edit_ingred_count); j++) {
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



//Create individual_ingredients component
var Individual_ingredients = function(props) {
    
    //Get initial variables
    var ingredient = props.ingredient;
    var id = props.counter;
    var additional_ingredients = props.additional_ingred;
    
    var ingred_count = props.ingred_count;
    var class_id = "form-control rec_ingredient_edit" + ingred_count;
    var class_id_blank = "form-control rec_ingredient_edit" + (ingred_count + additional_ingredients);
    
    
    
    
    if (props.blank && props.state.edit === true && props.state.id === id) {
        
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

            <p className="plain_ingredient">{ ingredient }</p>
        );
    }
    
    
} //End Individual_ingredients component


//Render App component to the DOM
ReactDOM.render(<App />, document.querySelector(".app"));

