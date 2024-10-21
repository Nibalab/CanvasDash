<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Static Grid</title>
  <link href="{{ asset('gridstack/gridstack.min.css') }}" rel="stylesheet" />
  <link rel="stylesheet" href="{{asset('gridstack.css')}}" />
  <script src="{{ asset('gridstack/gridstack-all.js') }}"></script>
</head>

<body>
  <div class="grid-stack"></div>
  <script type="text/javascript">
    let grid = GridStack.init({
      float: true,
      cellHeight: 120,
      acceptWidgets: true,
    });
    
    let serializedData = [
      {x: 0, y: 0, w: 2, h: 2, id: '0'},
      {x: 3, y: 1, h: 2, id: '1',  content: 'Content 1'},
      {x: 4, y: 1, id: '2'},
      {x: 2, y: 3, w: 3, id: '',  content: 'Content 2'},
      {x: 1, y: 3, id: '4',  content: 'Content 3'}
    ];

    grid.load(serializedData);

    // GridStack.setupDragIn('.sidebar>.grid-stack-item');
  </script>
</body>

</html>