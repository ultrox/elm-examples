### Decoders
- [Decoding in Elm - Jack](https://www.jackfranklin.co.uk/blog/json-decoding-in-elm/)
- Elm 0.19.1 (all runnable by copy/paste snippets)

Decoding validates and interprets data to ensure integrity, enforce data contracts, and mitigate security risks. Less strictly typed languages, such as JavaScript, presume data integrity and use implicit type coercion, risking bugs and vulnerabilities. Stricter languages like Elm require explicit decoding, enhancing safety and predictability.

### Simple decoding (Name)

```elm
module Main exposing (..)
import Json.Decode as Decode
import Html exposing (..)

jd: String
jd = "\"Jane\""

main =
 let
   result: Result Decode.Error String
   result = Decode.decodeString Decode.string jd
   _ = Debug.log "raw json" jd
   _ = Debug.log "result: this is decoded json" result
 in
 Html.div [] [Html.text "Hello"]
```

## Simple Decoding (List of Names)
```elm
module Main exposing (..)
import Json.Decode as Decode
import Html exposing (..)

jd: String
jd = """["Iva","Marko", "Jovana"]"""

main =
 let
   result: Result Decode.Error (List String)
   result = Decode.decodeString (Decode.list Decode.string) jd
   _ = Debug.log "raw json" jd
   _ = Debug.log "result: this is decoded json" result
 in
 Html.div [] [Html.text "Hello"]
```

## Simple Structure (one field)
We grab only field 'name'


```elm
module Main exposing (..)
import Html exposing (..)
import Json.Decode as Decode

main =
    let
        rjd =
            """{"name": "Jane", "data": {"name": "Joe Nested"}}"""

        result : Result Decode.Error String
        result =
            -- we can access nested props with .at
            Decode.decodeString (Decode.at [ "data", "name" ] Decode.string) rjd

        result2 : Result Decode.Error String
        result2 =
            -- we can access only one prop at the time with field
            Decode.decodeString (Decode.field "name" Decode.string) rjd

        _ = Debug.log "raw json" rjd
        _ = Debug.log "result: this is decoded json" result
    in
    Html.div [] [ Html.text "Hello" ]

```

### Slightly complex structure

```elm
module Main exposing (..)
import Html exposing (..)
import Json.Decode as Decode

type alias User =
    { name : String
    , age : Int
    }

rjd = """{"id": "AF123", "data": {"name": "Joe Nested", "age": 35}}"""

userDecoder : Decode.Decoder User
userDecoder =
    Decode.map2 User
        (Decode.field "name" Decode.string)
        (Decode.field "age" Decode.int)

resDecoder =
    Decode.field "data" userDecoder

main =
    let
        result : User
        result =
            case Decode.decodeString resDecoder rjd of
                Ok u -> u
                Err m -> User "error" 0

        _ = Debug.log "raw json" rjd
        _ = Debug.log "result: this is decoded json" result
    in
    Html.div [] [ Html.text "hi" ]
```
