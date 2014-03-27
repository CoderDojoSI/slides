
function create_meshes(set,map){
	var dataMeshes = {};
	var scale = 1;
	for (var element = 0; element < set.length; element++){
		if (dataMeshes[set[element]] === undefined){
			dataMeshes[set[element]] = new THREE.Mesh(new THREE.SphereGeometry(scale*1,32,64), new THREE.MeshLambertMaterial({color:map[set[element]]}));
		}
	}
	return dataMeshes;
}

function draw_data(data,coordinates,dataMeshes,map){
	var offset = 1;
	var dataMesh;
	var ch = coordinates.slice(0);

	for ( var element = 0 ; element < data.length; element++ ){

		dataMesh = dataMeshes[data[element]].clone();
		dataMesh.name = "data"
		for (var j = 0; j < coordinates.length; j++){
			
			var coor = ch.pop()

			if(j%3===0){
				if(j===0){dataMesh.position.x = data.length*2.25*coor + element*offset;}
				else{dataMesh.position.x += coordinates.length*data.length*coor;}
			}
			else if(j%3===1){
				if(j===1){dataMesh.position.y = 3.5*coor;}
				else{dataMesh.position.y += 10*coor;}
			}
			else if(j%3===2){
				if(j===2){dataMesh.position.z = 3.5*coor;}
				else{dataMesh.position.z += 10*coor;}
			}

		}

		ch = coordinates.slice(0);

		scene.add(dataMesh)
	}
}