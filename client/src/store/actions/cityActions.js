export const FITCH_CITY = "FITCH_CITY";

// I cleaned a bit your action, I was almost good, just a few probem with the .json() convertion and handeling the payload
//it shuld work now ;)
export const fetchCitiesAction = () => {
  return dispatch => {
    //add the full url of your back end
    fetch("http://localhost:5000/api/cities/all")
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        dispatch({ type: "FETCH_CITIES_SUCCESS", payload: json });
      })
      .catch(err => {
        dispatch({ type: "FETCH_CITIES_ERROR", payload: err });
      });
    //       .then(handleErrors)

    //       .then(res => res.json())
    //       .then(json => {
    //         dispatch(fetchCitiesSuccess(json.cities));
    //         return json.cities;
    //       })

    //       .catch(error => dispatch(fetchCitiesFailure(error)));
  };
  //   fetch("http://localhost:5000/api/cities/all")
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(result => {
  //       console.log("result :", result);
  //       this.setState({ cities: result });
  //       console.log(this.state.cities);
  //     });

  console.log("action");
};