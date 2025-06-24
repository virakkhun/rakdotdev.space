# How to pick file from a specific commit or branch

[getting-started](#getting-started)

Sometime you are doing a feature and push branch to remote, but you want to redo the changed of the specific file and you don't want to manually do it. So it is better to pick from a specific commit that you want as below.

```bash
git checkout <commit-hash> -- file/location file/location
```

### let walk through

- pick a file from a specific commit

I want to pick `utils/counter.ts` from `2b323`

```bash
git checkout 2b323 -- utils/counter.ts
```

- pick a file from a branch

I want to pick `utils/counter.ts` from `develop`

```bash
git checkout develop -- utils/counter.ts
```

- pick a file from a previous commit before specific commit

I want to pick `utils/counter.ts` from a commit before `2b323`

```bash
git checkout 2b323~ -- utils/counter.ts
```
