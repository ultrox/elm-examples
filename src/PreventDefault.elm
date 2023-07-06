module Main exposing (main)

import Browser
import Html exposing (Attribute, Html, button, div, text)
import Html.Attributes as Attr
import Html.Events exposing (on, onClick, preventDefaultOn)
import Json.Decode as Json


type alias Model =
    Int


init : Model
init =
    0


type Msg
    = Shoot Int


update : Msg -> Model -> Model
update msg m =
    case msg of
        Shoot i ->
            i


view : Model -> Html Msg
view model =
    Html.main_ []
        [ Html.header []
            [ Html.label []
                [ text "Type:"
                , Html.input [ onKeyDown ] []
                ]
            ]
        , Html.div [ Attr.class "display" ]
            [ text <| String.fromInt model
            ]
        , Html.div [] []
        ]


onKeyDown2 =
    on "keyup" (Json.map Shoot keyCodeDecoder)


onKeyDown =
    preventDefaultOn "keydown" (Json.map Shoot keyCodeDecoder |> Json.map alwaysPreventDefault)


onSubmit : msg -> Attribute msg
onSubmit msg =
    preventDefaultOn "submit" (Json.map alwaysPreventDefault (Json.succeed msg))


alwaysPreventDefault : msg -> ( msg, Bool )
alwaysPreventDefault msg =
    ( msg, True )


keyCodeDecoder =
    Json.field "keyCode" Json.int


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }

