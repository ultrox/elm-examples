port module Main exposing (main)

import Browser
import Html exposing (Html, button, text)
import Html.Attributes exposing (value)
import Html.Events exposing (..)
import Json.Decode as Decode
import Json.Encode as Encode


main : Program () Model Msg
main =
    Browser.element
        { view = view
        , init = \_ -> ( initialModel, Cmd.none )
        , update = update
        , subscriptions = \_ -> incomingMovieData MovieData
        }


type alias Model =
    { inputContent : String, movies : List String }


initialModel : Model
initialModel =
    { inputContent = "", movies = [ "Nothing..." ] }


type Msg
    = AddMovie2Db
    | InputMovie String
    | MovieData Decode.Value


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AddMovie2Db ->
            ( { model | inputContent = "" }, addMovie <| movieNameEnc model )

        InputMovie content ->
            ( { model | inputContent = content }, Cmd.none )

        MovieData jsonData ->
            case Decode.decodeValue moviesDecoder jsonData of
                Ok movies ->
                    ( { model | movies = movies }, Cmd.none )

                -- Error handling
                Err decodeError ->
                    ( model, Cmd.none )


port addMovie : Encode.Value -> Cmd msg


port incomingMovieData : (Decode.Value -> msg) -> Sub msg


moviesDecoder : Decode.Decoder (List String)
moviesDecoder =
    Decode.list Decode.string


movieNameEnc : Model -> Encode.Value
movieNameEnc model =
    Encode.string model.inputContent


view : Model -> Html Msg
view model =
    Html.form [ onSubmit AddMovie2Db ]
        [ Html.input
            [ onInput InputMovie, value model.inputContent ]
            []
        , button [] [ text "Add" ]
        , Html.ul [] (List.map (\movie -> Html.li [] [ text movie ]) model.movies)
        ]
