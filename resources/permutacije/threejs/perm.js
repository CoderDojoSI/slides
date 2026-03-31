function allPermutations( n, set, higherLayerElements, dimension) {

	if ( higherLayerElements === undefined ){var higherLayerElements = [], dimension = n, topLayer=[];}

	if ( n === dimension ){

		if ( n-1 === 0 ){
			var coordinates = []
			for ( var element = 0; element < set.length; element++ ){
				topLayer.push([set[element]]);
				coordinates.push([element])
				
				draw_data(topLayer[element],coordinates[element],dataMeshes,map)
			}
			return topLayer;
		}

		for ( var element = 0; element < set.length; element++ ) {
			higherLayerElements.push([set[element],element]);
			topLayer.push(allPermutations(n-1, set, higherLayerElements, dimension));
			higherLayerElements = [];

		}
		return topLayer;
	}
	else if (n < dimension && n-1 !== 0){
		var midLayer = [];
		for ( var element = 0; element < set.length; element++ ) {
			higherLayerElements.push([set[element],element]);
			midLayer[element] = allPermutations(n-1, set, higherLayerElements, dimension);
			higherLayerElements.pop();
		}
		return midLayer;
	}

	else if ( n-1 === 0 ){
		var botLayer = [];
		var coordinates = [];
		for ( var element = 0; element < set.length; element++ ) {
			botLayer[element] = [];
			for ( var i = 0; i < higherLayerElements.length; i++ ){
				botLayer[element].push(higherLayerElements[i][0]);
				// here we draw!
				coordinates.push(higherLayerElements[i][1]);

			}

			botLayer[element].push(set[element]);
			coordinates.push(element);
			

			draw_data(botLayer[element],coordinates,dataMeshes,map);
			coordinates = [];

			
		}
		return botLayer;
	}
}
