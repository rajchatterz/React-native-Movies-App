import { View, Text,Image, SafeAreaView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
const App = () => {
  const [movieData, setMovieData] = useState('')
  const [searchData, setSearchData] = useState('')
  const fetchData = async() => {
    try {
      const response =  await axios.get(`https://www.omdbapi.com/?t=${searchData}&apikey=483ea4bc`)
      setMovieData(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleSearch = () => {
    fetchData()
    setSearchData('')
  }
  if (!movieData) {
    return (
      <View>
        <Text>Not Found</Text>
      </View>
    )
  }
  
  return (
    <SafeAreaView style={styles.heroContainer}>
      <View style={styles.container}>
        <TextInput style={styles.inputContainer} value={searchData} placeholder='Search Movie'  onChangeText={(text) => setSearchData(text)} />
        <TouchableOpacity onPress={handleSearch} style={styles.buttonContainer}>
          <Text style={styles.inputColor}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttomContainer}>
        <Image resizeMode='contain' style={styles.imageContainer} source={{uri:movieData.Poster}} />
        <Text style={styles.movieTitle}>{movieData.Title}</Text>
        <Text style={styles.movieYear}>{movieData.Year}</Text>
        <Text style={styles.movieRating}>🌟{movieData.imdbRating}</Text>
        <Text style={styles.boxOffice}>{movieData.BoxOffice}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  boxOffice: {
    fontSize: 50,
    fontWeight: '900',
  },
  movieTitle: {
    top:-10,
    fontSize: 45,
    color: 'black',
    fontWeight: '900',
    
  },
  movieYear: {
    fontSize: 40,
    top: -10,
    color: 'black',
    fontWeight: '900',
  },
  movieRating: {
    fontSize: 40,
    right: 7,
    top: -10,
    color: 'black',
  },
  
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: '100%',
    marginHorizontal: 20,
    marginVertical: 30,
    gap:30
    
  },
  inputContainer: {
    width: '60%',
    height: 60,
    borderWidth: 0.2,
    borderRadius:5
  },
  buttonContainer: {
    width: '20%',
    
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8c244',
    borderRadius:5
    
  },
  inputColor: {
    color: 'white',
    fontWeight: '900',
    fontSize:16
  },
  buttomContainer: {
    alignItems: 'center',

  },
  imageContainer: {
    width: 300,
    height: 400,
    borderRadius:50
    
  },
  heroContainer: {
    flex: 1,
    alignItems: 'center',
  }
})

export default App