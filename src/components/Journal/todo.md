# 3 Stitch Apps in 30 Minutes

## App 1: Daily Journal

| db         | collection |
|------------|------------|
| `journal`  | `entries`  |

```javascript
{
  "date": <date>,
  "body": <string>,
  "sharedWith": [<email>, ...]
}
```

### Features

- Save daily journals
- Share 1 or more journal entries by email
- 

### Work To Do

- Create `JournalEntry` component
- Create `ShareEntry` component
- Hook up 


## App 2: Movie Night Planner

| db           | collection    |
|--------------|---------------|
| `movienight` | `suggestions` |

```javascript
{
  "date": <date>,
  "suggestedBy": <person>,
  "title": <string>,
  "genre": <string>,
  "imdb": <url>,
  "votes": {
    "for": [<person>, ...]
    "against": [<person>, ...]
  }
}
```

### Resources

| Fuzzy Search | Find by Title |
|-|-|
| `https://www.omdbapi.com/?apikey=da5002eb&s=silence` | `https://www.omdbapi.com/?apikey=da5002eb&t=the+silence+of+the+lambs` |

### Features

- Look up a movie by name
- Suggest a movie for a specific date
- Upvote or downvote suggested movies

## App 3: MongoGram

```javascript
{

}
```
